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

  // Try to find composer executable (skip lsphp)
  $composer_paths = [
    '/usr/local/bin/composer',
    '/usr/bin/composer',
    '/opt/cpanel/ea-php82/root/usr/bin/composer',
    'composer',
  ];

  $composer_cmd = null;
  foreach ($composer_paths as $path) {
    if (file_exists($path) && strpos($path, 'lsphp') === false) {
      $composer_cmd = $path;
      break;
    }
  }

  // If composer not found, download composer.phar and use with proper CLI PHP
  if (!$composer_cmd) {
    $output[] = "Composer executable not found. Attempting to download composer.phar...";

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

    // Use CLI-safe PHP binary with ini override
    $php_cli = 'php';
    $output[] = "Using CLI PHP: $php_cli";

    // Set COMPOSER_HOME to temp directory
    $composer_home = sys_get_temp_dir() . '/.composer';
    if (!is_dir($composer_home)) {
      mkdir($composer_home, 0755, true);
    }

    $output[] = "Setting COMPOSER_HOME to: $composer_home";
    $cmd = "COMPOSER_HOME=$composer_home $php_cli -d register_argc_argv=Off -d allow_url_fopen=On composer.phar install --no-dev --optimize-autoloader 2>&1";
  } else {
    $output[] = "Found composer executable: $composer_cmd";
    $cmd = "$composer_cmd install --no-dev --optimize-autoloader 2>&1";
  }

  $output[] = "Executing: $cmd";
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
