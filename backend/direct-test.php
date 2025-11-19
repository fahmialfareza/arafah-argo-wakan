<?php
// Direct app test - mimics what index.php does
header('Content-Type: application/json');

echo json_encode([
  'status' => 'Starting app test',
  'php_version' => phpversion(),
  'cwd' => getcwd(),
], JSON_PRETTY_PRINT);

echo "\n\nLoading bootstrap...\n";

try {
  $app = require __DIR__ . '/bootstrap/app.php';
  echo "✓ Bootstrap loaded\n";

  echo "\nApp details:\n";
  echo "- Version: " . $app->version() . "\n";

  echo "\nTesting root route handler...\n";
  $result = $app->version();
  echo "- Result: " . $result . "\n";

} catch (\Exception $e) {
  echo json_encode([
    'error' => $e->getMessage(),
    'file' => $e->getFile(),
    'line' => $e->getLine(),
  ], JSON_PRETTY_PRINT);
}
?>