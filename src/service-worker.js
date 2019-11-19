importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.setConfig({
    debug: true
  });

  workbox.precaching.precacheAndRoute([]);

  workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "css-cache"
    })
  );

  workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.CacheFirst({
      cacheName: "image-cache",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60
        })
      ]
    })
  );

  workbox.googleAnalytics.initialize({
    parameterOverrides: {
      cd1: "offline"
    },
    hitFilter: params => {
      const queueTimeInSeconds = Math.round(params.get("qt") / 1000);
      params.set("cm1", queueTimeInSeconds);
    }
  });

  addEventListener("message", event => {
    if (event.data && event.data.type === "SKIP_WAITING") {
      skipWaiting();
    }
  });
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
