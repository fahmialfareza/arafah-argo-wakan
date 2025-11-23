<?php

return [
  /*
  |--------------------------------------------------------------------------
  | Mail Driver
  |--------------------------------------------------------------------------
  |
  | Laravel supports both SMTP and PHP's "sendmail" driver. You may specify
  | which one you're using throughout your application here. By default,
  | Laravel is setup for SMTP mail.
  |
  | Supported: "smtp", "sendmail", "mailgun", "mandrill", "ses", "sparkpost"
  |
  */
  'driver' => env('MAIL_DRIVER', 'smtp'),

  /*
  |--------------------------------------------------------------------------
  | SMTP Host
  |--------------------------------------------------------------------------
  |
  | Here you may provide the host address of the SMTP server used by your
  | applications to send e-mail. A example is included that works with
  | the Mailtrap mail testing service free account.
  |
  */
  'host' => env('MAIL_HOST', 'smtp.mailtrap.io'),

  /*
  |--------------------------------------------------------------------------
  | SMTP Port
  |--------------------------------------------------------------------------
  |
  | This is the SMTP port used by your application to send e-mail to users
  | at your application. This port is used to authenticate to your mail
  | server. You should be able to figure out your mail server port as well.
  |
  */
  'port' => env('MAIL_PORT', 2525),

  /*
  |--------------------------------------------------------------------------
  | Global "From" Address
  |--------------------------------------------------------------------------
  |
  | You may wish for all e-mails sent by your application to be sent from
  | the same address. Here, you may specify a name and address that is
  | used globally for all e-mails that are sent by your application.
  |
  */
  'from' => [
    'address' => env('MAIL_FROM_ADDRESS', 'hello@example.com'),
    'name' => env('MAIL_FROM_NAME', 'Example'),
  ],

  /*
  |--------------------------------------------------------------------------
  | E-Mail Encryption Protocol
  |--------------------------------------------------------------------------
  |
  | Here you may specify the encryption protocol that should be used when
  | the application send e-mail message to your clients. Both a plain
  | text the SSL encrypted protocols are supported by the framework.
  |
  | Supported: "tls", "ssl", null
  |
  */
  'encryption' => env('MAIL_ENCRYPTION', 'tls'),

  /*
  |--------------------------------------------------------------------------
  | SMTP Server Username
  |--------------------------------------------------------------------------
  |
  | If your SMTP server requires a username for authentication, you should
  | set it here. This will get used to authenticate with your server on
  | connection. You may also set the "password" value below this one.
  |
  */
  'username' => env('MAIL_USERNAME'),

  /*
  |--------------------------------------------------------------------------
  | SMTP Server Password
  |--------------------------------------------------------------------------
  |
  | Here you may set the password required by your SMTP server to send out
  | messages from your application. This will be given back to the server
  | on connection so that the application will be able to send messages.
  |
  */
  'password' => env('MAIL_PASSWORD'),

  /*
  |--------------------------------------------------------------------------
  | SMTP Timeout
  |--------------------------------------------------------------------------
  |
  | The number of seconds to wait before timing out when connecting to the
  | SMTP server. Increase this if you're experiencing timeout errors.
  |
  */
  'timeout' => env('MAIL_TIMEOUT', 30),

  /*
  |--------------------------------------------------------------------------
  | Stream Options
  |--------------------------------------------------------------------------
  |
  | Additional stream context options for SMTP connections.
  | Useful for SSL/TLS verification and connection settings.
  |
  */
  'stream' => [
    'ssl' => [
      'verify_peer' => env('MAIL_VERIFY_PEER', true),
      'verify_peer_name' => env('MAIL_VERIFY_PEER_NAME', true),
      'allow_self_signed' => env('MAIL_ALLOW_SELF_SIGNED', false),
    ],
  ],

  /*
  |--------------------------------------------------------------------------
  | Mail Queue Connection
  |--------------------------------------------------------------------------
  |
  | Queue connection to use for queued mail. Set to null to use default.
  |
  */
  'queue' => env('MAIL_QUEUE_CONNECTION', null),

];
