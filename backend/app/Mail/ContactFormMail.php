<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactFormMail extends Mailable
{
  use Queueable, SerializesModels;

  public $name;
  public $company;
  public $email;
  public $phone;
  public $message;
  public $products;

  /**
   * Create a new message instance.
   *
   * @return void
   */
  public function __construct($contactData)
  {
    $this->name = $contactData['name'];
    $this->company = $contactData['company'];
    $this->email = $contactData['email'];
    $this->phone = $contactData['phone'];
    $this->message = $contactData['message'];
    $this->products = implode(', ', $contactData['products']);
  }

  /**
   * Build the message.
   *
   * @return $this
   */
  public function build()
  {
    return $this
      ->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'))
      ->to(env('MAIL_TO_ADDRESS'))
      ->subject('New Inquiry from ' . $this->name)
      ->view('emails.contact-form');
  }
}
