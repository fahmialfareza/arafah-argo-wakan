#!/usr/bin/env node

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const SSG_DIR = path.resolve(ROOT_DIR, "dist-ssg");
const PORT = 4173;

const server = http.createServer((req, res) => {
  let filePath = path.join(SSG_DIR, req.url === "/" ? "index.html" : req.url);

  // If requesting a route without extension, serve index.html
  if (req.url !== "/" && !path.extname(filePath)) {
    filePath = path.join(filePath, "index.html");
  }

  // Add CORS and security headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Not Found</h1>");
      return;
    }

    // Determine content type
    let contentType = "application/octet-stream";
    if (filePath.endsWith(".html")) contentType = "text/html";
    else if (filePath.endsWith(".js")) contentType = "application/javascript";
    else if (filePath.endsWith(".css")) contentType = "text/css";
    else if (filePath.endsWith(".json")) contentType = "application/json";
    else if (filePath.endsWith(".svg")) contentType = "image/svg+xml";
    else if (filePath.endsWith(".png")) contentType = "image/png";
    else if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg"))
      contentType = "image/jpeg";
    else if (filePath.endsWith(".gif")) contentType = "image/gif";
    else if (filePath.endsWith(".woff"))
      contentType = "application/x-font-woff";
    else if (filePath.endsWith(".woff2"))
      contentType = "application/x-font-woff2";
    else if (filePath.endsWith(".ttf")) contentType = "application/x-font-ttf";

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 SSG Preview Server\n`);
  console.log(`Local:   http://localhost:${PORT}`);
  console.log(`Network: http://127.0.0.1:${PORT}\n`);
  console.log(`Routes:`);
  console.log(`  • http://localhost:${PORT}/`);
  console.log(`  • http://localhost:${PORT}/about`);
  console.log(`  • http://localhost:${PORT}/export-products`);
  console.log(`  • http://localhost:${PORT}/import-products`);
  console.log(`  • http://localhost:${PORT}/facility`);
  console.log(`  • http://localhost:${PORT}/contact\n`);
  console.log(`Press Ctrl+C to stop\n`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\n❌ Port ${PORT} is already in use.`);
    console.error(
      `Kill the process or use: lsof -ti:${PORT} | xargs kill -9\n`
    );
  } else {
    console.error("Server error:", err);
  }
  process.exit(1);
});
