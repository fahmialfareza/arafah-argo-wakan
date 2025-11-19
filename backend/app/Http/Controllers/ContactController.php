<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

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
      $name = $request->input('name');
      $company = $request->input('company');
      $email = $request->input('email');
      $phone = $request->input('phone', 'N/A');
      $message_text = $request->input('message');
      $products = $request->input('products', []);

      // Build HTML email
      $html = view('emails.contact-form', [
        'name' => $name,
        'company' => $company,
        'email' => $email,
        'phone' => $phone,
        'message' => $message_text,
        'products' => $products,
      ])->render();

      // Send HTML email to business
      Mail::html($html, function ($message) use ($name) {
        $message->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'))
          ->to(env('MAIL_TO_ADDRESS'))
          ->subject('New Inquiry from ' . $name);
      });

      // Log the inquiry (optional)
      \Log::info('Contact inquiry received', [
        'name' => $name,
        'email' => $email,
        'company' => $company,
        'timestamp' => date('Y-m-d H:i:s'),
      ]);

      return response()->json([
        'success' => true,
        'message' => 'Inquiry submitted successfully! We will contact you soon.',
        'data' => [
          'reference_id' => 'INQ-' . date('YmdHis') . '-' . rand(1000, 9999),
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
