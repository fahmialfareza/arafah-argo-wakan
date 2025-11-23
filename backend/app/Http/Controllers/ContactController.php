<?php

namespace App\Http\Controllers;

use App\Jobs\SendContactEmailJob;
use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Queue;

class ContactController extends Controller
{
  /**
   * Handle contact form submission
   */
  public function submitInquiry(Request $request)
  {
    // Validate input
    $validator = Validator::make($request->all(), [
      'name' => 'required|string|max:255',
      'company' => 'required|string|max:255',
      'email' => 'required|email',
      'phone' => 'nullable|string|max:20',
      'message' => 'required|string|max:2000',
      'products' => 'required|array|min:1',
      'products.*' => 'string',
    ]);

    if ($validator->fails()) {
      return response()->json([
        'success' => false,
        'message' => 'Validation failed',
        'errors' => $validator->errors(),
      ], 422);
    }

    try {
      // Prepare data for email
      $emailData = [
        'name' => $request->input('name'),
        'company' => $request->input('company'),
        'email' => $request->input('email'),
        'phone' => $request->input('phone', 'N/A'),
        'message' => $request->input('message'),
        'products' => $request->input('products', []),
      ];

      // Generate reference ID
      $referenceId = 'INQ-' . date('YmdHis') . '-' . rand(1000, 9999);

      // Queue the email (prevents timeout issues)
      // Uses database queue by default, falls back to sync if queue not configured
      try {
        Queue::push(new SendContactEmailJob($emailData));
        \Log::info('Contact inquiry queued for email delivery', [
          'reference_id' => $referenceId,
          'name' => $emailData['name'],
          'email' => $emailData['email'],
          'company' => $emailData['company'],
        ]);
      } catch (\Exception $queueException) {
        // If queueing fails, try sending immediately
        \Log::warning('Queue failed, attempting immediate send', [
          'error' => $queueException->getMessage(),
        ]);

        $html = view('emails.contact-form', $emailData)->render();

        Mail::html($html, function ($message) use ($emailData) {
          $message->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'))
            ->to(env('MAIL_TO_ADDRESS'))
            ->subject('New Inquiry from ' . $emailData['name']);
        });
      }

      return response()->json([
        'success' => true,
        'message' => 'Inquiry submitted successfully! We will contact you soon.',
        'data' => [
          'reference_id' => $referenceId,
          'submitted_at' => date('c'),
        ]
      ], 200);

    } catch (\Exception $e) {
      \Log::error('Contact form submission error', [
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString(),
      ]);

      return response()->json([
        'success' => false,
        'message' => 'Failed to submit inquiry. Please try again later.',
        'error' => config('app.debug') ? $e->getMessage() : null,
      ], 500);
    }
  }

  /**
   * Test contact form endpoint (for development)
   */
  public function test()
  {
    return response()->json([
      'message' => 'Contact form API is working',
      'endpoint' => '/api/contact/submit-inquiry',
      'method' => 'POST',
      'required_fields' => [
        'name',
        'company',
        'email',
        'message',
        'products' => ['array of product strings']
      ],
    ]);
  }
}
