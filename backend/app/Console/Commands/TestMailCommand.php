<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestMailCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mail:test {email? : The email address to send test to}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test SMTP mail configuration by sending a test email';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Testing mail configuration...');
        $this->newLine();

        // Display current configuration
        $this->line('Current Mail Settings:');
        $this->table(
            ['Setting', 'Value'],
            [
                ['Driver', env('MAIL_DRIVER')],
                ['Host', env('MAIL_HOST')],
                ['Port', env('MAIL_PORT')],
                ['Encryption', env('MAIL_ENCRYPTION')],
                ['Username', env('MAIL_USERNAME') ? '***' . substr(env('MAIL_USERNAME'), -4) : 'Not set'],
                ['From Address', env('MAIL_FROM_ADDRESS')],
                ['From Name', env('MAIL_FROM_NAME')],
            ]
        );

        $this->newLine();

        // Get recipient email
        $recipient = $this->argument('email') ?? env('MAIL_TO_ADDRESS');

        if (!$recipient) {
            $recipient = $this->ask('Enter recipient email address');
        }

        if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
            $this->error('Invalid email address!');
            return 1;
        }

        // Test connection
        $this->info('Testing SMTP connection...');

        try {
            $start = microtime(true);

            // Attempt to send test email
            Mail::raw('This is a test email from Arafah Argo Wakan backend.', function ($message) use ($recipient) {
                $message->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'))
                    ->to($recipient)
                    ->subject('Test Email - ' . date('Y-m-d H:i:s'));
            });

            $duration = round((microtime(true) - $start) * 1000);

            $this->newLine();
            $this->info("✓ Email sent successfully to {$recipient}!");
            $this->line("  Duration: {$duration}ms");
            $this->newLine();

            return 0;

        } catch (\Symfony\Component\Mailer\Exception\TransportException $e) {
            $this->newLine();
            $this->error('✗ SMTP Connection Failed!');
            $this->error('Error: ' . $e->getMessage());
            $this->newLine();

            $this->diagnose($e);

            return 1;

        } catch (\Exception $e) {
            $this->newLine();
            $this->error('✗ Failed to send email!');
            $this->error('Error: ' . $e->getMessage());
            $this->newLine();

            return 1;
        }
    }

    /**
     * Diagnose common mail issues
     */
    protected function diagnose(\Exception $e)
    {
        $errorMessage = $e->getMessage();

        $this->line('Diagnosis:');
        $this->newLine();

        // Connection timeout
        if (strpos($errorMessage, 'Connection timed out') !== false) {
            $this->warn('Connection Timeout Detected');
            $this->line('Possible causes:');
            $this->line('  1. Firewall blocking outbound connections to port ' . env('MAIL_PORT'));
            $this->line('  2. SMTP host is unreachable from this server');
            $this->line('  3. Network configuration issues');
            $this->newLine();
            $this->line('Solutions:');
            $this->line('  • Contact your hosting provider to check firewall rules');
            $this->line('  • Verify outbound port ' . env('MAIL_PORT') . ' is open');
            $this->line('  • Try alternative ports (587 for TLS, 465 for SSL, 2525 alternative)');
            $this->line('  • Check if server IP needs to be whitelisted with SMTP provider');
        }

        // Authentication failed
        if (strpos($errorMessage, 'Authentication') !== false || strpos($errorMessage, 'Username and Password') !== false) {
            $this->warn('Authentication Failed');
            $this->line('Possible causes:');
            $this->line('  1. Incorrect MAIL_USERNAME or MAIL_PASSWORD');
            $this->line('  2. Need to use API key instead of password (e.g., SendGrid)');
            $this->line('  3. Account not verified with SMTP provider');
            $this->newLine();
            $this->line('Solutions:');
            $this->line('  • Verify credentials in .env file');
            $this->line('  • Check if SMTP provider requires API key');
            $this->line('  • Ensure account is verified and active');
        }

        // SSL/TLS errors
        if (strpos($errorMessage, 'SSL') !== false || strpos($errorMessage, 'TLS') !== false) {
            $this->warn('SSL/TLS Connection Error');
            $this->line('Possible causes:');
            $this->line('  1. Wrong encryption setting for the port');
            $this->line('  2. SSL certificate verification issues');
            $this->newLine();
            $this->line('Solutions:');
            $this->line('  • Use MAIL_ENCRYPTION=tls for port 587');
            $this->line('  • Use MAIL_ENCRYPTION=ssl for port 465');
            $this->line('  • Set MAIL_ENCRYPTION=null for port 25');
        }

        $this->newLine();
        $this->line('Troubleshooting Steps:');
        $this->line('  1. Test DNS resolution: ping ' . env('MAIL_HOST'));
        $this->line('  2. Test port connectivity: telnet ' . env('MAIL_HOST') . ' ' . env('MAIL_PORT'));
        $this->line('  3. Check error logs: tail -f storage/logs/lumen-*.log');
        $this->line('  4. Try a different SMTP provider (e.g., Mailtrap for testing)');
    }
}
