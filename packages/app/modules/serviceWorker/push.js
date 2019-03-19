/* global self, clients */
/* eslint-disable no-restricted-globals */

self.addEventListener('push', (event) => {
  const { message: body, url } = event.data.json()
  const options = {
    body,
    icon: '/assets/images/logo/logo192x192.png',
    badge: '/assets/images/logo/logo96x96.png',
    data: {
      url,
    },
  }

  event.waitUntil(self.registration.showNotification('CraCra', options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(clients.openWindow(event.notification.data.url || '/'))
})
