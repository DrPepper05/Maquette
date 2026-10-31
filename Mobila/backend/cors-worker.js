/**
 * Cloudflare Worker: Dynamic CORS & Domain Protection for WebAR 3D Assets
 * Description: Intercepts requests for GLB/USDZ assets, checks the request
 * Origin/Referer against a tenant domain whitelist, and dynamically returns
 * the proper CORS headers. Prevents model theft and hotlinking.
 */

// Mock Database of Client Domain Whitelists (In production, load this from Cloudflare KV or D1)
const TENANT_DOMAINS = {
  // api_key: [whitelisted_domains]
  'mobila_test_key_123': [
    'localhost:3000',
    'localhost:4000',
    'localhost:8080',
    'clientstore.com',
    'www.clientstore.com',
    'my-furniture-shop.myshopify.com'
  ]
};

// S3 or Cloudflare R2 Storage Bucket Origin
const BUCKET_ORIGIN = 'https://mobila-assets-bucket.s3.amazonaws.com';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const origin = request.headers.get('Origin');
  
  // Extract tenant API Key from query params or custom header (e.g., ?apiKey=xyz)
  const apiKey = url.searchParams.get('apiKey') || request.headers.get('X-Mobila-API-Key');
  
  console.log(`[CORS Worker] Request for: ${url.pathname}, Origin: ${origin}, API Key: ${apiKey}`);

  // Handle preflight OPTIONS requests immediately
  if (request.method === 'OPTIONS') {
    return handlePreflight(request, origin, apiKey);
  }

  // Validate the origin and API key
  const isAuthorized = validateTenantOrigin(origin, apiKey);
  
  if (!isAuthorized) {
    return new Response(JSON.stringify({ 
      error: 'Unauthorized origin or invalid API Key. Asset hotlinking is restricted.' 
    }), {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
        // Still return origin-specific block if browser requires it
        'Access-Control-Allow-Origin': origin || '*'
      }
    });
  }

  // Rewrite the request to the underlying S3/R2 storage bucket
  const bucketUrl = new URL(url.pathname, BUCKET_ORIGIN);
  
  // Fetch asset from private/public bucket storage
  let response = await fetch(bucketUrl.toString(), {
    method: request.method,
    headers: request.headers
  });

  // Reconstruct response to inject dynamic CORS headers
  response = new Response(response.body, response);
  
  // Set origin-specific CORS headers dynamically
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Mobila-API-Key');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Vary', 'Origin'); // Crucial: tells CDNs to cache separately by request Origin
  }

  return response;
}

/**
 * Validate that the request origin is whitelisted for the given API Key
 */
function validateTenantOrigin(origin, apiKey) {
  // If no origin is sent (e.g., server-to-server or direct browser URL entry), we can decide to allow or block.
  // For WebAR (fetched via model-viewer on a browser page), Origin is ALWAYS sent.
  if (!origin) {
    return true; // Allow direct downloads if desired, or return false to restrict completely
  }

  // Parse origin domain
  try {
    const originUrl = new URL(origin);
    const originHost = originUrl.host; // e.g. "localhost:3000" or "clientstore.com"

    // Fetch whitelisted domains for this tenant
    const whitelistedDomains = TENANT_DOMAINS[apiKey];

    if (!whitelistedDomains) {
      return false; // Invalid or missing API key
    }

    // Check if host matches any whitelisted domain (supports exact matching)
    return whitelistedDomains.includes(originHost);
  } catch (e) {
    return false; // Malformed origin
  }
}

/**
 * Handle HTTP OPTIONS preflight request
 */
function handlePreflight(request, origin, apiKey) {
  const isAuthorized = validateTenantOrigin(origin, apiKey);
  
  const headers = {
    'Access-Control-Max-Age': '86400', // Cache preflight response for 24 hours
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || 'Content-Type, X-Mobila-API-Key',
  };

  if (isAuthorized && origin) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
    headers['Vary'] = 'Origin';
  } else {
    headers['Access-Control-Allow-Origin'] = origin || '*';
  }

  return new Response(null, {
    status: 204, // No Content
    headers: headers
  });
}
