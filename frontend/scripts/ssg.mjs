#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { renderToString } from "react-dom/server";
import React from "react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.resolve(ROOT_DIR, "dist");
const SSG_DIST_DIR = path.resolve(ROOT_DIR, "dist-ssg");

// Route metadata for SEO
const routeMetadata = {
  "/": {
    title: "PT Arafah Agro Wakan - Premium Indonesian Commodities",
    description:
      "Your trusted partner for high-quality Briquettes, Spices, Coffee, and Agricultural products from Indonesia.",
    keywords:
      "Indonesian commodities, briquettes, spices, coffee, export, import",
    image:
      "https://images.unsplash.com/photo-1511920183864-4143ba26b6f0?auto=format&fit=crop&w=1200&q=80",
  },
  "/about": {
    title: "About Us - PT Arafah Agro Wakan",
    description:
      "Learn about our mission, values, and commitment to quality in Indonesian commodity trading.",
    keywords: "about us, company, mission, values, Indonesian commodities",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
  "/export-products": {
    title: "Export Products - PT Arafah Agro Wakan",
    description:
      "Explore our premium export products including Briquettes, Spices, Coffee, and Agricultural commodities.",
    keywords: "export products, briquettes, spices, coffee, commodities",
    image:
      "https://images.unsplash.com/photo-1621034424647-1f9b4e53c43f?auto=format&fit=crop&w=1200&q=80",
  },
  "/import-products": {
    title: "Import Products - PT Arafah Agro Wakan",
    description:
      "Discover our curated selection of high-quality food products imported for local market demands.",
    keywords: "import products, food, commodities, sourcing",
    image:
      "https://images.unsplash.com/photo-1611091219153-e3223f009c2b?auto=format&fit=crop&w=1200&q=80",
  },
  "/facility": {
    title: "Our Facility - PT Arafah Agro Wakan",
    description:
      "Tour our state-of-the-art facility for processing, grading, and packing export-ready products.",
    keywords: "facility, warehouse, processing, equipment, infrastructure",
    image:
      "https://images.unsplash.com/photo-1588444968576-f76e39065d62?auto=format&fit=crop&w=1200&q=80",
  },
  "/contact": {
    title: "Contact Us - PT Arafah Agro Wakan",
    description:
      "Get in touch with our team for inquiries, quotations, and business partnerships.",
    keywords: "contact, inquiry, quotation, business partnership",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
};

const routes = Object.keys(routeMetadata);

/**
 * Generate HTML file with proper meta tags
 */
function generatePage(route, metadata, assetJS, assetCSS) {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/logo.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${metadata.description}" />
    <meta name="keywords" content="${metadata.keywords}" />
    <meta name="theme-color" content="#15803d" />
    
    <!-- Open Graph for Social Media -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://arafahagro.com${route}" />
    <meta property="og:title" content="${metadata.title}" />
    <meta property="og:description" content="${metadata.description}" />
    <meta property="og:image" content="${metadata.image}" />
    <meta property="og:site_name" content="PT Arafah Agro Wakan" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${metadata.title}" />
    <meta name="twitter:description" content="${metadata.description}" />
    <meta name="twitter:image" content="${metadata.image}" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://arafahagro.com${route}" />
    
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PT Arafah Agro Wakan",
      "url": "https://arafahagro.com",
      "logo": "https://arafahagro.com/logo.svg",
      "description": "${metadata.description}",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "ID"
      }
    }
    </script>
    
    <title>${metadata.title}</title>
    <!-- Font Awesome for Icons -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <!-- Vite App Scripts and Styles -->
    <script type="module" crossorigin src="${assetJS}"></script>
    <link rel="stylesheet" crossorigin href="${assetCSS}">
  </head>
  <body class="font-poppins">
    <div id="root"></div>
  </body>
</html>`;

  return html;
}

/**
 * Generate sitemap.xml for SEO
 */
function generateSitemap() {
  const baseUrl = "https://arafahagro.com";
  const urls = routes
    .map((route) => {
      return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${route === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/**
 * Generate robots.txt for SEO
 */
function generateRobotsTxt() {
  return `# Robots.txt for PT Arafah Agro Wakan
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /private

# Crawl delay (milliseconds)
Crawl-delay: 1

# Sitemap location
Sitemap: https://arafahagro.com/sitemap.xml

# Specific rules for common bots
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1
`;
}

/**
 * Main SSG build function
 */
async function buildSSG() {
  console.log("🏗️  Starting Static Site Generation...\n");

  try {
    // Step 1: Clean and create directories
    console.log("📁 Preparing directories...");
    await fs.remove(SSG_DIST_DIR);
    await fs.ensureDir(SSG_DIST_DIR);
    await fs.ensureDir(path.join(SSG_DIST_DIR, "assets"));

    // Step 2: Build the app with Vite
    console.log("🔨 Building app with Vite...");
    const { execSync } = await import("child_process");
    try {
      execSync("npm run build", { stdio: "inherit" });
    } catch (e) {
      console.error("Vite build failed:", e.message);
      process.exit(1);
    }

    // Step 3: Copy built assets
    console.log("📦 Copying built assets...");
    const assetsDir = path.join(DIST_DIR, "assets");
    if (await fs.pathExists(assetsDir)) {
      await fs.copy(assetsDir, path.join(SSG_DIST_DIR, "assets"));
    }

    // Step 4: Copy public files
    console.log("🖼️  Copying public assets...");
    const publicDir = path.join(ROOT_DIR, "public");
    if (await fs.pathExists(publicDir)) {
      await fs.copy(publicDir, SSG_DIST_DIR, {
        filter: (src) => !src.includes(".htaccess"), // Skip htaccess, we'll handle it
      });
    }

    // Step 4.5: Extract asset filenames from Vite build
    console.log("🔍 Extracting asset filenames from Vite build...");
    const viteIndexPath = path.join(DIST_DIR, "index.html");
    const viteIndexContent = await fs.readFile(viteIndexPath, "utf8");

    // Extract JS and CSS asset paths
    const jsMatch = viteIndexContent.match(/src="(\/assets\/index-[^"]+\.js)"/);
    const cssMatch = viteIndexContent.match(
      /href="(\/assets\/index-[^"]+\.css)"/
    );

    if (!jsMatch || !cssMatch) {
      console.error("❌ Could not find asset references in Vite build");
      process.exit(1);
    }

    const assetJS = jsMatch[1];
    const assetCSS = cssMatch[1];
    console.log(`  ✓ Found JS: ${assetJS}`);
    console.log(`  ✓ Found CSS: ${assetCSS}`);

    // Step 5: Generate HTML files with SEO metadata
    console.log("🌐 Generating HTML pages with SEO metadata...");
    for (const route of routes) {
      const metadata = routeMetadata[route];
      const html = generatePage(route, metadata, assetJS, assetCSS);

      // Create directory structure
      let filePath;
      if (route === "/") {
        filePath = path.join(SSG_DIST_DIR, "index.html");
      } else {
        const routePath = path.join(SSG_DIST_DIR, route);
        await fs.ensureDir(routePath);
        filePath = path.join(routePath, "index.html");
      }

      await fs.writeFile(filePath, html);
      console.log(`  ✓ Generated ${route}`);
    }

    // Step 6: Generate sitemap.xml
    console.log("🗺️  Generating sitemap.xml...");
    const sitemap = generateSitemap();
    await fs.writeFile(path.join(SSG_DIST_DIR, "sitemap.xml"), sitemap);

    // Step 7: Generate robots.txt
    console.log("🤖 Generating robots.txt...");
    const robotsTxt = generateRobotsTxt();
    await fs.writeFile(path.join(SSG_DIST_DIR, "robots.txt"), robotsTxt);

    // Step 8: Create .htaccess for SPA routing (optional)
    console.log("⚙️  Creating .htaccess configuration...");
    const htaccess = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Don't rewrite actual files or directories
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  
  # Don't rewrite /assets/ directory
  RewriteCond %{REQUEST_URI} !^/assets/
  
  # Don't rewrite /sitemap.xml or /robots.txt
  RewriteCond %{REQUEST_URI} !^/sitemap\\.xml$
  RewriteCond %{REQUEST_URI} !^/robots\\.txt$
  
  # Serve /route/index.html for /route requests
  RewriteRule ^([a-zA-Z0-9_-]+)/?$ $1/index.html [L]
  
  # Root request gets index.html
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^$ index.html [L]
</IfModule>

# Add proper MIME types for fonts and assets
<IfModule mod_mime.c>
  AddType application/x-font-ttf ttf
  AddType application/x-font-otf otf
  AddType application/x-font-woff woff
  AddType application/x-font-woff2 woff2
  AddEncoding gzip .gz
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "no-referrer-when-downgrade"
</IfModule>

# Caching rules
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 hour"
  ExpiresByType text/html "access plus 1 hour"
  ExpiresByType text/css "access plus 1 week"
  ExpiresByType application/javascript "access plus 1 week"
  ExpiresByType application/x-javascript "access plus 1 week"
  ExpiresByType image/jpeg "access plus 1 month"
  ExpiresByType image/gif "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType application/x-font-ttf "access plus 1 month"
  ExpiresByType application/x-font-woff "access plus 1 month"
  ExpiresByType application/x-font-woff2 "access plus 1 month"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css text/xml text/javascript application/xml application/xhtml+xml application/rss+xml application/javascript application/x-javascript image/svg+xml
</IfModule>
`;
    await fs.writeFile(path.join(SSG_DIST_DIR, ".htaccess"), htaccess);

    // Step 9: Generate build info
    const buildInfo = {
      generatedAt: new Date().toISOString(),
      version: "1.0.0",
      routes: routes.length,
      routesList: routes,
      seo: {
        hasSitemap: true,
        hasRobots: true,
        hasCanonical: true,
        hasStructuredData: true,
      },
    };
    await fs.writeJSON(path.join(SSG_DIST_DIR, "build-info.json"), buildInfo, {
      spaces: 2,
    });

    // Success output
    console.log("\n✅ SSG Build Complete!\n");
    console.log("📊 Build Summary:");
    console.log(`  • Output Directory: ${SSG_DIST_DIR}`);
    console.log(`  • Routes Generated: ${routes.length}`);
    console.log(`  • Routes: ${routes.join(", ")}`);
    console.log(`  • Sitemap: ${path.join(SSG_DIST_DIR, "sitemap.xml")}`);
    console.log(`  • Robots.txt: ${path.join(SSG_DIST_DIR, "robots.txt")}`);
    console.log(`\n🚀 Ready for deployment!\n`);

    process.exit(0);
  } catch (error) {
    console.error("\n❌ SSG Build Failed:", error.message);
    process.exit(1);
  }
}

// Run the build
buildSSG();
