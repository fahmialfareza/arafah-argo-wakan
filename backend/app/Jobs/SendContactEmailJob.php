<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendContactEmailJob extends Job implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;

    /**
     * The number of seconds to wait before retrying the job.
     *
     * @var int
     */
    public $retryAfter = 60;

    /**
     * The data for the email
     *
     * @var array
     */
    protected $emailData;

    /**
     * Create a new job instance.
     *
     * @param array $emailData
     * @return void
     */
    public function __construct(array $emailData)
    {
        $this->emailData = $emailData;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            // Build HTML email
            $html = view('emails.contact-form', [
                'name' => $this->emailData['name'],
                'company' => $this->emailData['company'],
                'email' => $this->emailData['email'],
                'phone' => $this->emailData['phone'],
                'message' => $this->emailData['message'],
                'products' => $this->emailData['products'],
            ])->render();

            // Send HTML email to business
            Mail::html($html, function ($message) {
                $message->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'))
                    ->to(env('MAIL_TO_ADDRESS'))
                    ->subject('New Inquiry from ' . $this->emailData['name']);
            });

            Log::info('Contact email sent successfully', [
                'name' => $this->emailData['name'],
                'email' => $this->emailData['email'],
                'attempt' => $this->attempts(),
            ]);

        } catch (\Exception $e) {
            Log::error('Contact email sending failed', [
                'error' => $e->getMessage(),
                'attempt' => $this->attempts(),
                'max_tries' => $this->tries,
            ]);

            // Re-throw the exception to trigger retry
            if ($this->attempts() < $this->tries) {
                throw $e;
            }

            // After all retries failed, log final failure
            Log::critical('Contact email failed after all retries', [
                'data' => $this->emailData,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Handle a job failure.
     *
     * @param \Exception $exception
     * @return void
     */
    public function failed(\Exception $exception)
    {
        Log::critical('Contact email job failed permanently', [
            'data' => $this->emailData,
            'error' => $exception->getMessage(),
            'trace' => $exception->getTraceAsString(),
        ]);

        // You could send a notification to admins here
        // Or store failed emails in a database for manual review
    }
}
