<?php

if (!defined('LARAVEL_START')) {
  define('LARAVEL_START', microtime(true));
}

ini_set('display_errors', 1);
error_reporting(E_ALL);

try {
  $app = require __DIR__ . '/bootstrap/app.php';
  $app->run();
} catch (\Exception $e) {
  http_response_code(500);
  header('Content-Type: application/json');
  die(json_encode([
    'error' => $e->getMessage(),
    'file' => $e->getFile(),
    'line' => $e->getLine(),
  ], JSON_PRETTY_PRINT));
} catch (\Throwable $e) {
  http_response_code(500);
  header('Content-Type: application/json');
  die(json_encode([
    'error' => $e->getMessage(),
    'file' => $e->getFile(),
    'line' => $e->getLine(),
  ], JSON_PRETTY_PRINT));
}
