importScripts('workbox-sw.prod.v2.1.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "3rdpartylicenses.txt",
    "revision": "6aac8ec08092a652435ab740386732ff"
  },
  {
    "url": "favicon.ico",
    "revision": "b9aa7c338693424aae99599bec875b5f"
  },
  {
    "url": "index.html",
    "revision": "1a3665187196f2efbc7f2f75e365ec48"
  },
  {
    "url": "inline.3eb4ccd87af7f80f44d6.bundle.js",
    "revision": "cc0dc898f00ee357430cba601a1fc9fa"
  },
  {
    "url": "main.237120da0b893fdf4d93.bundle.js",
    "revision": "060aabe09f30961c193c97a3e648296f"
  },
  {
    "url": "polyfills.036982dc15bb5fc67cb8.bundle.js",
    "revision": "7a2ef2e4566d6cebc8c46f51d79d58f9"
  },
  {
    "url": "styles.d41d8cd98f00b204e980.bundle.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "vendor.d0d31b6a772f1d0a46f3.bundle.js",
    "revision": "0bffacaa96e8f65d3be136b582bae976"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
