<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle(Request $request, Closure $next)
  {
    // Get allowed origins from env, default to all
    $allowed_origins = explode(',', env('CORS_ALLOWED_ORIGINS', '*'));
    $origin = $request->header('Origin', '');

    // Check if origin is allowed
    $allow_origin = in_array('*', $allowed_origins) || in_array($origin, $allowed_origins) ? $origin : '';

    $headers = [
      'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
      'Access-Control-Allow-Headers' => 'Origin, Content-Type, Accept, Authorization, X-Requested-With, X-Request-ID, X-API-KEY',
      'Access-Control-Max-Age' => '86400',
      'Access-Control-Allow-Credentials' => 'true',
    ];

    // Only add Origin header if we have an allowed origin
    if ($allow_origin || in_array('*', $allowed_origins)) {
      $headers['Access-Control-Allow-Origin'] = in_array('*', $allowed_origins) ? '*' : $origin;
    }

    if ($request->isMethod('OPTIONS')) {
      return response('', 200, $headers);
    }

    $response = $next($request);

    foreach ($headers as $key => $value) {
      $response->header($key, $value);
    }

    return $response;
  }
}

