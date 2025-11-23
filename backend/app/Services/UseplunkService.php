<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

class UseplunkService
{
  /**
   * Useplunk API endpoint
   */
  const API_URL = 'https://api.useplunk.com/v1/send';

  /**
   * @var Client
   */
  protected $client;

  /**
   * @var string
   */
  protected $apiKey;

  /**
   * Create a new Useplunk service instance.
   */
  public function __construct()
  {
    $this->apiKey = env('USEPLUNK_API_KEY');
    $this->client = new Client([
      'timeout' => 30,
      'connect_timeout' => 10,
    ]);
  }

  /**
   * Send email via Useplunk API
   *
   * @param array $data Email data containing to, subject, body, etc.
   * @return array Response from Useplunk API
   * @throws \Exception
   */
  public function sendEmail(array $data)
  {
    if (empty($this->apiKey)) {
      throw new \Exception('USEPLUNK_API_KEY is not configured in .env file');
    }

    // Validate required fields
    $this->validateEmailData($data);

    // Build request payload according to Useplunk API docs
    $payload = [
      'to' => $data['to'],
      'subject' => $data['subject'],
      'body' => $data['body'],
    ];

    // Optional fields
    if (isset($data['from'])) {
      $payload['from'] = $data['from'];
    }

    if (isset($data['name'])) {
      $payload['name'] = $data['name'];
    }

    if (isset($data['reply_to'])) {
      $payload['reply'] = $data['reply_to'];
    }

    try {
      Log::info('Sending email via Useplunk API', [
        'to' => $data['to'],
        'subject' => $data['subject'],
      ]);

      $response = $this->client->post(self::API_URL, [
        'headers' => [
          'Authorization' => 'Bearer ' . $this->apiKey,
          'Content-Type' => 'application/json',
          'Accept' => 'application/json',
        ],
        'json' => $payload,
      ]);

      $statusCode = $response->getStatusCode();
      $responseBody = json_decode($response->getBody()->getContents(), true);

      if ($statusCode >= 200 && $statusCode < 300) {
        Log::info('Email sent successfully via Useplunk', [
          'to' => $data['to'],
          'response' => $responseBody,
        ]);

        return [
          'success' => true,
          'data' => $responseBody,
        ];
      }

      throw new \Exception('Unexpected status code: ' . $statusCode);

    } catch (GuzzleException $e) {
      Log::error('Useplunk API error', [
        'error' => $e->getMessage(),
        'to' => $data['to'] ?? null,
        'subject' => $data['subject'] ?? null,
      ]);

      throw new \Exception('Failed to send email via Useplunk: ' . $e->getMessage(), 0, $e);
    }
  }

  /**
   * Validate email data
   *
   * @param array $data
   * @throws \Exception
   */
  protected function validateEmailData(array $data)
  {
    $required = ['to', 'subject', 'body'];

    foreach ($required as $field) {
      if (empty($data[$field])) {
        throw new \Exception("Missing required field: {$field}");
      }
    }

    // Validate email format
    if (!filter_var($data['to'], FILTER_VALIDATE_EMAIL)) {
      throw new \Exception("Invalid email address: {$data['to']}");
    }
  }

  /**
   * Send contact form email
   *
   * @param array $contactData Contact form data
   * @return array
   * @throws \Exception
   */
  public function sendContactFormEmail(array $contactData)
  {
    // Build HTML email body
    $html = view('emails.contact-form', [
      'name' => $contactData['name'],
      'company' => $contactData['company'],
      'email' => $contactData['email'],
      'phone' => $contactData['phone'],
      'message' => $contactData['message'],
      'products' => $contactData['products'],
    ])->render();

    $emailData = [
      'to' => env('MAIL_TO_ADDRESS', 'business@arafahagro.com'),
      'from' => env('MAIL_FROM_ADDRESS', 'noreply@arafahagro.com'),
      'name' => env('MAIL_FROM_NAME', 'Arafah Agro'),
      'subject' => 'New Inquiry from ' . $contactData['name'],
      'body' => $html,
      'reply_to' => $contactData['email'],
    ];

    return $this->sendEmail($emailData);
  }
}

