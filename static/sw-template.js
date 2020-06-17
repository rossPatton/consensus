/*eslint-disable */

self.__precacheManifest = [].concat(self.__precacheManifest || []);

// suppress warnings if revision is not provided
// workbox.precaching.suppressWarnings();

// precahce and route asserts built by webpack
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// return app shell for all navigation requests
workbox.routing.registerNavigationRoute('/');

// routing for api
workbox.routing.registerRoute(
  /^https:\/\/consensus\.local\/api\/v1\//,
  // /^https:\/\/consens\.us\.org\/api\/v1\//,
  workbox.strategies.networkFirst({
    cacheName: 'consensus-api-cache'
  })
);

// routing for cloud served images
// workbox.routing.registerRoute(
//   /^https:\/\/.+\.(jpe?g|png|gif|svg|webp)$/i,
//   workbox.strategies.cacheFirst({
//     cacheName: 'consensus-image-cache',
//     plugins: [
//       new workbox.expiration.Plugin({
//         // Only cache requests for a week
//         maxAgeSeconds: 7 * 24 * 60 * 60,
//         // Only cache 20 requests.
//         maxEntries: 20
//       }),
//       new workbox.cacheableResponse.Plugin({
//         statuses: [0, 200]
//       })
//     ]
//   })
// );

/*eslint-enable */
