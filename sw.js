const CACHE = 'teqxus-v5';
const ASSETS = ['/', '/index.html', '/manifest.json', '/admin.html', '/teqdocs/', '/teqdocs/index.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
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
  // Never cache POST requests or API calls
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('onrender.com')) return;
  if (e.request.url.includes('supabase.co')) return;
  if (e.request.url.includes('groq.com')) return;
  if (e.request.url.includes('openrouter.ai')) return;
  if (e.request.url.includes('anthropic.com')) return;
  if (e.request.url.includes('chrome-extension')) return;
  if (e.request.url.includes('cdnjs.cloudflare.com')) return;
  if (e.request.url.includes('googlesyndication.com')) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
