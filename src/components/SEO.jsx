import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://swaplinq.com';
const SITE_NAME = 'SwaplinQ';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_DESC = "SwaplinQ is a non-custodial instant cryptocurrency exchange aggregating 10+ liquidity providers for the best rates on 1,500+ assets. No KYC, no accounts, no data stored.";

const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  jsonLd,        // Array of JSON-LD objects for page-specific structured data
  ogImage,       // Override default OG image
  noIndex,       // Set to true to block indexing (e.g. 404 page)
  dateModified,  // ISO 8601 date string
}) => {
  const location = useLocation();
  const fullTitle = `${title} | ${SITE_NAME} — Non-Custodial Crypto Exchange`;
  const pageDesc = description || DEFAULT_DESC;
  const pageCanonical = canonical || `${SITE_URL}${location.pathname === '/' ? '' : location.pathname}`;
  const pageImage = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={pageDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={pageCanonical} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'} />
      {dateModified && <meta name="article:modified_time" content={dateModified} />}
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME} — ${title}`} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={pageImage} />

      {/* Page-specific JSON-LD structured data */}
      {jsonLd && jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

// ─── Pre-built JSON-LD helpers ───

/**
 * Generate FAQPage JSON-LD from an array of {q, a} or {question, answer} objects
 */
export const buildFAQSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": items.map(item => ({
    "@type": "Question",
    "name": item.q || item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a || item.answer,
    }
  }))
});

/**
 * Generate HowTo JSON-LD from an array of {title, desc} step objects
 */
export const buildHowToSchema = (name, description, steps) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": name,
  "description": description,
  "totalTime": "PT5M",
  "tool": {
    "@type": "HowToTool",
    "name": "Cryptocurrency wallet (e.g. MetaMask, Trust Wallet, Ledger)"
  },
  "step": steps.map((step, i) => ({
    "@type": "HowToStep",
    "position": i + 1,
    "name": step.title,
    "text": step.desc || step.text || step.description,
    "url": `${SITE_URL}/how-it-works#step-${i + 1}`
  }))
});

/**
 * Generate BreadcrumbList JSON-LD from an array of {name, url} objects
 */
export const buildBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": item.name,
    "item": item.url
  }))
});

export default SEO;
