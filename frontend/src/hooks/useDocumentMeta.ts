import { useEffect } from "react";

interface DocumentMetaProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  canonical?: string;
}

/**
 * Hook to manage document head metadata for SEO
 * Updates title, meta tags, and structured data
 */
export function useDocumentMeta({
  title,
  description,
  keywords = "",
  image = "https://images.unsplash.com/photo-1511920183864-4143ba26b6f0?auto=format&fit=crop&w=1200&q=80",
  canonical = "",
}: DocumentMetaProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta =
        document.querySelector(`meta[name="${name}"]`) ||
        document.querySelector(`meta[property="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(name.startsWith("og:") ? "property" : "name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic SEO meta tags
    updateMetaTag("description", description);
    if (keywords) {
      updateMetaTag("keywords", keywords);
    }

    // Open Graph tags
    updateMetaTag("og:title", title);
    updateMetaTag("og:description", description);
    updateMetaTag("og:image", image);
    updateMetaTag("og:type", "website");

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    return () => {
      // Cleanup is handled by React, but we could add any needed cleanup here
    };
  }, [title, description, keywords, image, canonical]);
}
