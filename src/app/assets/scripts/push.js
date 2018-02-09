/* global self, clients */
/* eslint-disable no-restricted-globals */

self.addEventListener('push', (event) => {
  const options = {
    body: event.data.json().message,
    icon: '/assets/images/logo/logo192x192.png',
    badge: '/assets/images/logo/logo96x96.png',
  }

  event.waitUntil(self.registration.showNotification('CraCra', options))
})

self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click Received.')

  event.notification.close()

  event.waitUntil(clients.openWindow('/'))
})
