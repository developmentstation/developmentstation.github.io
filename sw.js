// Development Station Service Worker v2.0.0
// Enhanced caching strategy for better performance and SEO

const CACHE_VERSION = 'v2.0.0';
const CACHE_NAME = `dev-station-${CACHE_VERSION}`;
const STATIC_CACHE = `dev-station-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dev-station-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `dev-station-images-${CACHE_VERSION}`;

// Core files to cache immediately
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/modern-styles.css',
  '/assets/css/spa-styles.css',
  '/assets/js/modern-shared.js',
  '/assets/js/spa-router.js',
  '/assets/js/spa-components-new.js',
  '/assets/js/spa-tools.js',
  '/assets/js/spa-app.js',
  '/404.html'
];

// Tool pages to precache for offline use
const TOOL_PAGES = [
  '/tools/json-formatter.html',
  '/tools/base64-encoder.html',
  '/tools/password-generator.html',
  '/tools/qr-generator.html',
  '/tools/unix-timestamp-converter.html',
  '/tools/hash-generator.html',
  '/tools/url-encoder.html',
  '/tools/uuid-generator.html',
  '/tools/jwt-decoder.html',
  '/tools/regex-tester.html'
];

// Install event - cache core assets
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing version:', CACHE_VERSION);
  
  event.waitUntil(
    Promise.all([
      // Cache core assets
      caches.open(STATIC_CACHE).then(cache => {
        console.log('[Service Worker] Caching core assets');
        return cache.addAll(CORE_ASSETS);
      }),
      // Cache tool pages
      caches.open(DYNAMIC_CACHE).then(cache => {
        console.log('[Service Worker] Caching tool pages');
        return cache.addAll(TOOL_PAGES);
      })
    ]).then(() => {
      console.log('[Service Worker] Installation complete');
      return self.skipWaiting();
    }).catch(error => {
      console.error('[Service Worker] Installation failed:', error);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating version:', CACHE_VERSION);
  
  const cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip external requests (except for allowed CDNs)
  if (url.origin !== location.origin && 
      !url.origin.includes('googleapis.com') && 
      !url.origin.includes('gstatic.com')) {
    return;
  }
  
  // Network-first strategy for HTML (for fresh content)
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone and cache successful responses
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache, then offline page
          return caches.match(request)
            .then(response => response || caches.match('/404.html'));
        })
    );
    return;
  }
  
  // Cache-first strategy for images
  if (request.destination === 'image' || 
      url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i)) {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) return response;
        
        return fetch(request).then(response => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(IMAGE_CACHE).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        }).catch(() => {
          // Return placeholder image for failed image requests
          return new Response('', { status: 404 });
        });
      })
    );
    return;
  }
  
  // Cache-first strategy for CSS, JS, and fonts
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'font' ||
      url.pathname.match(/\.(css|js|woff|woff2|ttf|eot)$/i)) {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) return response;
        
        return fetch(request).then(response => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        });
      })
    );
    return;
  }
  
  // Default strategy - network with cache fallback
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('[Service Worker] Background sync:', event.tag);
  
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // Implement data sync when needed
      Promise.resolve()
    );
  }
});

// Listen for messages from the client
self.addEventListener('message', event => {
  console.log('[Service Worker] Message received:', event.data);
  
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.action === 'clearCache') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }).then(() => {
        console.log('[Service Worker] All caches cleared');
      })
    );
  }
});

// Push notification support
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New updates available!',
    icon: '/assets/images/icon-192x192.png',
    badge: '/assets/images/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open Development Station'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Development Station', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Error handling
self.addEventListener('error', event => {
  console.error('[Service Worker] Error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('[Service Worker] Unhandled promise rejection:', event.reason);
});

console.log('[Service Worker] Loaded version:', CACHE_VERSION);