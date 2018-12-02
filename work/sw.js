// Copyright 2016 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('the-magic-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/dragon.html',
        '/faq.html',
        '/manifest.json',
        '/background.jpeg',
        '/construction.gif',
        '/dragon.png',
        '/logo.png',
        '/site.js',
        '/dragon.js',
        '/styles.css',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.url == 'https://dragon-server.appspot.com/') {
    console.info('responding to dragon-server fetch with Service Worker! 👩‍💻');
    event.respondWith(fetch(event.request).catch(function(e) {
      let out = {Gold: 1, Size: -1, Actions: []};
      return new Response(JSON.stringify(out));
    }));
    return;
  }
});

self.addEventListener('push', function(event) {
  event.waitUntil(
    self.registration.showNotification('Got Push?', {
      body: 'Push Message received'
   }));
});
