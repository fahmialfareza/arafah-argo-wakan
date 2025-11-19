<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;

class MailService
{
  /**
   * Send a simple text email
   *
   * @param string $to Recipient email
   * @param string $subject Email subject
   * @param string $body Email body
   * @return bool
   */
  public static function sendSimple($to, $subject, $body)
  {
    try {
      Mail::raw($body, function ($message) use ($to, $subject) {
        $message->to($to)->subject($subject);
      });
      return true;
    } catch (\Exception $e) {
      \Log::error('Email send failed: ' . $e->getMessage());
      return false;
    }
  }

  /**
   * Send an HTML email
   *
   * @param string $to Recipient email
   * @param string $subject Email subject
   * @param string $html HTML content
   * @return bool
   */
  public static function sendHtml($to, $subject, $html)
  {
    try {
      Mail::send([], [], function ($message) use ($to, $subject, $html) {
        $message->to($to)
          ->subject($subject)
          ->setBody($html, 'text/html');
      });
      return true;
    } catch (\Exception $e) {
      \Log::error('HTML Email send failed: ' . $e->getMessage());
      return false;
    }
  }

  /**
   * Send bulk emails
   *
   * @param array $recipients Array of recipient emails
   * @param string $subject Email subject
   * @param string $body Email body
   * @return array Results array with success and failed counts
   */
  public static function sendBulk($recipients, $subject, $body)
  {
    $results = [
      'success' => 0,
      'failed' => 0,
      'errors' => []
    ];

    foreach ($recipients as $email) {
      try {
        Mail::raw($body, function ($message) use ($email, $subject) {
          $message->to($email)->subject($subject);
        });
        $results['success']++;
      } catch (\Exception $e) {
        $results['failed']++;
        $results['errors'][] = [
          'email' => $email,
          'error' => $e->getMessage()
        ];
      }
    }

    return $results;
  }

  /**
   * Send email with attachments
   *
   * @param string $to Recipient email
   * @param string $subject Email subject
   * @param string $body Email body
   * @param array $attachments Array of file paths
   * @return bool
   */
  public static function sendWithAttachments($to, $subject, $body, $attachments = [])
  {
    try {
      Mail::raw($body, function ($message) use ($to, $subject, $attachments) {
        $message->to($to)->subject($subject);

        foreach ($attachments as $attachment) {
          if (file_exists($attachment)) {
            $message->attach($attachment);
          }
        }
      });
      return true;
    } catch (\Exception $e) {
      \Log::error('Email with attachments send failed: ' . $e->getMessage());
      return false;
    }
  }
}
