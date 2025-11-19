<?php

namespace App\Http\Controllers;

use App\Mail\WelcomeMail;
use App\Services\MailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
  /**
   * Send a simple test email
   */
  public function sendSimpleEmail()
  {
    $success = MailService::sendSimple(
      'test@example.com',
      'Test Email',
      'This is a test email from Arafah backend!'
    );

    return response()->json([
      'status' => $success ? 'success' : 'failed',
      'message' => $success ? 'Email sent successfully!' : 'Failed to send email'
    ]);
  }

  /**
   * Send welcome email using Mailable
   */
  public function sendWelcomeEmail(Request $request)
  {
    try {
      $user = [
        'name' => $request->input('name', 'User'),
        'email' => $request->input('email', 'user@example.com')
      ];

      Mail::send(new WelcomeMail($user));

      return response()->json([
        'status' => 'success',
        'message' => 'Welcome email sent successfully!',
        'recipient' => $user['email']
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'status' => 'failed',
        'message' => 'Failed to send welcome email',
        'error' => $e->getMessage()
      ], 500);
    }
  }

  /**
   * Send HTML email
   */
  public function sendHtmlEmail(Request $request)
  {
    $html = '<h1>Welcome!</h1><p>Thank you for joining us.</p>';

    $success = MailService::sendHtml(
      $request->input('email', 'user@example.com'),
      $request->input('subject', 'HTML Email'),
      $html
    );

    return response()->json([
      'status' => $success ? 'success' : 'failed',
      'message' => $success ? 'HTML email sent!' : 'Failed to send email'
    ]);
  }

  /**
   * Send bulk emails
   */
  public function sendBulkEmails(Request $request)
  {
    $recipients = $request->input('recipients', ['test1@example.com', 'test2@example.com']);

    $results = MailService::sendBulk(
      $recipients,
      'Bulk Email Test',
      'This email was sent as part of a bulk email campaign.'
    );

    return response()->json([
      'status' => 'completed',
      'results' => $results
    ]);
  }

  /**
   * Check mail configuration
   */
  public function checkMailConfig()
  {
    return response()->json([
      'driver' => config('mail.driver'),
      'host' => config('mail.host'),
      'port' => config('mail.port'),
      'encryption' => config('mail.encryption'),
      'from' => config('mail.from'),
      'configured' => !empty(config('mail.username')) && !empty(config('mail.password'))
    ]);
  }
}
