const CACHE = 'teqxus-v6-juice';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/about.html',
  '/contact.html',
  '/privacy.html',
  '/admin.html',
  '/guides/',
  '/guides/index.html',
  '/guides/how-to-use-teqdocs.html',
  '/guides/offline-ai-guide.html',
  '/guides/focus-with-ambient-sounds.html',
  '/guides/document-formats.html',
  '/teqdocs/',
  '/teqdocs/index.html',
  '/teqdocs/manifest.json',
  '/teqdocs/atom-one-dark.min.css',
  '/cookie-consent.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      c.addAll(ASSETS).catch(err => {
        // Partial cache is fine — some paths may 404 in local/dev
        console.warn('SW cache partial:', err);
      })
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = e.request.url;
  // Never cache API / auth / ads / CDNs
  if (
    url.includes('onrender.com') ||
    url.includes('supabase.co') ||
    url.includes('groq.com') ||
    url.includes('openrouter.ai') ||
    url.includes('anthropic.com') ||
    url.includes('chrome-extension') ||
    url.includes('cdnjs.cloudflare.com') ||
    url.includes('googlesyndication.com') ||
    url.includes('googleapis.com') ||
    url.includes('gstatic.com')
  ) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request)
        .then(res => {
          if (res && res.ok && res.type === 'basic') {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => cached);
      // Prefer cache for navigations / static when offline, otherwise network-first with cache fallback
      return cached || network;
    })
  );
});
