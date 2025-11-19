<?php

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| First we need to get an application instance. This creates an instance
| of the application / container and bootstraps the application so it
| is ready to receive HTTP / Console requests from the environment.
|
| This is the main entry point for cPanel deployments where public folder
| is not directly accessible as the document root.
|
*/

// Enable error reporting for debugging
if (!defined('LARAVEL_START')) {
  define('LARAVEL_START', microtime(true));
}

// Display errors during loading
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

// Log errors to file
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/storage/logs/php-errors.log');

try {
  $app = require __DIR__ . '/bootstrap/app.php';
} catch (\Exception $e) {
  http_response_code(500);
  header('Content-Type: application/json');
  die(json_encode([
    'error' => 'Application bootstrap failed',
    'message' => $e->getMessage(),
    'file' => $e->getFile(),
    'line' => $e->getLine(),
  ]));
}

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request
| through the kernel, and send the associated response back to
| the client's browser allowing them to enjoy the creative
| and wonderful application we have prepared for them.
|
*/

try {
  $app->run();
} catch (\Exception $e) {
  http_response_code(500);
  header('Content-Type: application/json');
  die(json_encode([
    'error' => 'Application execution failed',
    'message' => $e->getMessage(),
  ]));
}

