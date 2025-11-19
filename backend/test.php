<?php
// Simple test to diagnose the issue
echo "Test Page - Backend is responding!<br>";
echo "PHP Version: " . phpversion() . "<br>";
echo "Current Directory: " . getcwd() . "<br>";

// Try to load the app
try {
  require __DIR__ . '/bootstrap/app.php';
  echo "✓ Bootstrap loaded successfully<br>";
  echo "✓ App is working!<br>";
} catch (Exception $e) {
  echo "✗ Error loading bootstrap: " . $e->getMessage() . "<br>";
  echo "File: " . $e->getFile() . "<br>";
  echo "Line: " . $e->getLine() . "<br>";
}

// Check files
echo "<br>File Status:<br>";
echo (file_exists('.env') ? "✓" : "✗") . " .env exists<br>";
echo (file_exists('bootstrap/app.php') ? "✓" : "✗") . " bootstrap/app.php exists<br>";
echo (file_exists('vendor/autoload.php') ? "✓" : "✗") . " vendor/autoload.php exists<br>";
echo (is_writable('storage') ? "✓" : "✗") . " storage/ is writable<br>";
?>