/* global self */
/* eslint-disable no-restricted-globals */

import { HEADER_CACHE_FIRST } from '../../modules/auth/auth.constants'

const getResponseWithCacheHeader = (response) => {
  const headers = new Headers(response.headers)
  headers.set('x-from-sw-cache', 'true')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

const respondWithNetworkFirst = async (event) => {
  const cache = await caches.open('cracra-v1')
  try {
    const response = await fetch(event.request)
    if (response.ok) {
      event.waitUntil(cache.put(event.request.url, response.clone()))
    }
    return response
  } catch (e) {
    const cachedResponse = await cache.match(event.request)
    if (!cachedResponse) {
      throw e
    }
    return getResponseWithCacheHeader(cachedResponse)
  }
}

const respondWithCacheFirst = async (event) => {
  const cache = await caches.open('cracra-v1')
  const cachedResponse = await cache.match(event.request)
  if (!cachedResponse) {
    return fetch(event.request)
      .catch(e => console.error(e))
  }
  const response = getResponseWithCacheHeader(cachedResponse)
  event.waitUntil(cache.add(event.request))
  return response
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || !event.request.url.match(/\/api\//)) return
  if (event.request.url.match(/\/api\/health/)) return

  if (event.request.headers.has(HEADER_CACHE_FIRST)) {
    event.respondWith(respondWithCacheFirst(event))
  } else {
    event.respondWith(respondWithNetworkFirst(event))
  }
})
