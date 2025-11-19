<?php

/** @var \Laravel\Lumen\Routing\Router $router */

use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// Example route to send a test email
$router->get('/send-email', function () {
    try {
        Mail::raw('This is a test email from Arafah!', function ($message) {
            $message->to('test@example.com')
                ->subject('Test Email from Arafah');
        });
        return response()->json(['message' => 'Email sent successfully!'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

// Email controller routes
$router->get('/email/simple', 'EmailController@sendSimpleEmail');
$router->post('/email/welcome', 'EmailController@sendWelcomeEmail');
$router->post('/email/html', 'EmailController@sendHtmlEmail');
$router->post('/email/bulk', 'EmailController@sendBulkEmails');
$router->get('/email/config', 'EmailController@checkMailConfig');

// Contact form routes
$router->get('/contact/test', 'ContactController@test');
$router->post('/contact/submit-inquiry', 'ContactController@submitInquiry');

