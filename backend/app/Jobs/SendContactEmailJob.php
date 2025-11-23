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
    public $tries = 5;

    /**
     * The number of seconds to wait before retrying the job.
     *
     * @var int
     */
    public $retryAfter = 90;

    /**
     * The number of seconds the job can run before timing out.
     *
     * @var int
     */
    public $timeout = 120;

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
            // Check if SMTP is configured
            if (!env('MAIL_HOST') || !env('MAIL_USERNAME')) {
                throw new \Exception('SMTP configuration is missing. Please check MAIL_HOST and MAIL_USERNAME.');
            }

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
                    ->replyTo($this->emailData['email'], $this->emailData['name'])
                    ->subject('New Inquiry from ' . $this->emailData['name']);
            });

            Log::info('Contact email sent successfully', [
                'name' => $this->emailData['name'],
                'email' => $this->emailData['email'],
                'attempt' => $this->attempts(),
            ]);

        } catch (\Symfony\Component\Mailer\Exception\TransportException $e) {
            // Handle SMTP-specific errors
            Log::error('SMTP connection error in contact email', [
                'error' => $e->getMessage(),
                'attempt' => $this->attempts(),
                'max_tries' => $this->tries,
                'smtp_host' => env('MAIL_HOST'),
                'smtp_port' => env('MAIL_PORT'),
            ]);

            // Re-throw to trigger retry with exponential backoff
            if ($this->attempts() < $this->tries) {
                $this->release($this->retryAfter * $this->attempts());
                return;
            }

            // Log final failure
            Log::critical('Contact email failed after all retries - SMTP connection issue', [
                'data' => $this->emailData,
                'error' => $e->getMessage(),
                'smtp_config' => [
                    'host' => env('MAIL_HOST'),
                    'port' => env('MAIL_PORT'),
                    'encryption' => env('MAIL_ENCRYPTION'),
                ]
            ]);

            throw $e;

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

            throw $e;
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
