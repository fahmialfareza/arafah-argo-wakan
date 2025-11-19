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

  // Try to find composer executable
  $composer_paths = [
    '/usr/local/bin/composer',
    '/usr/bin/composer',
    '/opt/cpanel/ea-php82/root/usr/bin/composer',
    'composer',
  ];

  $composer_cmd = null;
  foreach ($composer_paths as $path) {
    if (file_exists($path)) {
      $composer_cmd = $path;
      break;
    }
  }

  // If composer not found, try to download composer.phar
  if (!$composer_cmd) {
    $output[] = "Composer executable not found in PATH. Attempting to download composer.phar...";

    if (!file_exists('composer.phar')) {
      $output[] = "Downloading composer.phar from https://getcomposer.org/composer.phar";
      $composer_phar = file_get_contents('https://getcomposer.org/composer.phar');

      if ($composer_phar === false) {
        throw new Exception('Failed to download composer.phar. Check internet connectivity on server.');
      }

      if (file_put_contents('composer.phar', $composer_phar) === false) {
        throw new Exception('Failed to save composer.phar to disk.');
      }

      chmod('composer.phar', 0755);
      $output[] = "✓ composer.phar downloaded successfully";
    } else {
      $output[] = "Using existing composer.phar";
    }

    $php_binary = PHP_BINARY ?: 'php';
    $composer_cmd = "$php_binary composer.phar";
  }

  $output[] = "Using composer: $composer_cmd";
  $output[] = "Running: $composer_cmd install --no-dev --optimize-autoloader";

  // Try with -d register_argc_argv=Off flag to bypass LiteSpeed PHP restrictions
  $cmd = "$composer_cmd install --no-dev --optimize-autoloader 2>&1";

  // If using php binary, add the ini setting
  if (strpos($composer_cmd, 'php') !== false || strpos($composer_cmd, 'lsphp') !== false) {
    $cmd = "$composer_cmd -d register_argc_argv=Off install --no-dev --optimize-autoloader 2>&1";
    $output[] = "Running with register_argc_argv=Off flag...";
  }

  $result = shell_exec($cmd);

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
