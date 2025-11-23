<?php

namespace App\Jobs;

use App\Services\UseplunkService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
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
            // Check if Useplunk API key is configured
            if (!env('USEPLUNK_API_KEY')) {
                throw new \Exception('USEPLUNK_API_KEY is not configured in .env file');
            }

            // Use Useplunk API service to send email
            $useplunk = new UseplunkService();
            $result = $useplunk->sendContactFormEmail($this->emailData);

            Log::info('Contact email sent successfully via Useplunk API', [
                'name' => $this->emailData['name'],
                'email' => $this->emailData['email'],
                'attempt' => $this->attempts(),
                'response' => $result,
            ]);

        } catch (\Exception $e) {
            Log::error('Contact email sending failed via Useplunk API', [
                'error' => $e->getMessage(),
                'attempt' => $this->attempts(),
                'max_tries' => $this->tries,
            ]);

            // Re-throw the exception to trigger retry with exponential backoff
            if ($this->attempts() < $this->tries) {
                $this->release($this->retryAfter * $this->attempts());
                return;
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
