// Industry Art · service worker de la versión web.
// Sirve el juego desde la caché (abre al instante y sin conexión) y la actualiza en segundo plano:
// una versión nueva subida al servidor se usa a partir de la siguiente vez que se abre.
const CACHE = "__CACHE__";
const BASE = ["./", "index.html", "manifest.webmanifest", "icono-192.png", "icono-512.png", "icono-maskable-512.png", "apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(BASE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((ks) => Promise.all(ks.filter((k) => k.startsWith("industry-art-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(async (c) => {
      const guardado = await c.match(r, { ignoreSearch: true });
      const red = fetch(r)
        .then((res) => {
          if (res && res.ok && res.type === "basic") c.put(r, res.clone());
          return res;
        })
        .catch(() => null);
      if (guardado) {
        e.waitUntil(red);
        return guardado;
      }
      return (await red) || (r.mode === "navigate" && (await c.match("index.html"))) || Response.error();
    }),
  );
});
