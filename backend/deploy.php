<?php
/**
 * Deployment Script for Composer Dependencies
 * 
 * This script runs composer install after FTP deployment.
 * Access it at: https://arafahagro.com/backend/deploy.php?key=YOUR_SECRET_KEY
 * 
 * IMPORTANT: Replace YOUR_SECRET_KEY in the URL with the actual key from your .env file
 */

// Security: Check for secret key
$secret_key = getenv('DEPLOY_SECRET_KEY') ?: 'your_secret_key_here';
$provided_key = $_GET['key'] ?? '';

if ($provided_key !== $secret_key) {
  http_response_code(403);
  die('Forbidden: Invalid or missing secret key');
}

// Prevent timeout
set_time_limit(300);

$output = [];
$status = 'error';

try {
  $output[] = "Starting deployment process...";
  $output[] = "Current directory: " . getcwd();

  // Check if composer.json exists
  if (!file_exists('composer.json')) {
    throw new Exception('composer.json not found in current directory');
  }

  $output[] = "Found composer.json";

  // Run composer install - try multiple common paths
  $composer_paths = [
    '/usr/local/bin/composer',
    '/usr/bin/composer',
    '/opt/cpanel/ea-php82/root/usr/bin/composer',
    'composer',
    php_sapi_name() === 'cli' ? shell_exec('which composer') : null
  ];

  $composer_cmd = null;
  foreach ($composer_paths as $path) {
    if ($path && file_exists(trim($path))) {
      $composer_cmd = trim($path);
      break;
    }
  }

  if (!$composer_cmd) {
    throw new Exception('Composer not found. Common paths checked: ' . implode(', ', array_filter($composer_paths)));
  }

  $output[] = "Found composer at: $composer_cmd";
  $output[] = "Running: $composer_cmd install --no-dev --optimize-autoloader";
  $result = shell_exec("$composer_cmd install --no-dev --optimize-autoloader 2>&1");

  if ($result === null) {
    throw new Exception('Failed to execute composer install.');
  }

  $output[] = $result;

  // Check if vendor directory was created
  if (is_dir('vendor')) {
    $output[] = "✓ vendor directory successfully created";
    $status = 'success';
  } else {
    throw new Exception('vendor directory was not created after running composer install');
  }

  $output[] = "Deployment completed successfully!";

} catch (Exception $e) {
  $output[] = "ERROR: " . $e->getMessage();
  $status = 'error';
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode([
  'status' => $status,
  'messages' => $output,
  'timestamp' => date('Y-m-d H:i:s')
]);
