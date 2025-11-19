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

  // Run composer install
  $output[] = "Running: composer install --no-dev --optimize-autoloader";
  $result = shell_exec('composer install --no-dev --optimize-autoloader 2>&1');

  if ($result === null) {
    throw new Exception('Failed to execute composer install. Make sure composer is installed on the server.');
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
