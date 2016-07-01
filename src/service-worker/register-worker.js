export function registerWorker () {
  if (!navigator.serviceWorker) {
    return
  }

  navigator.serviceWorker
    .register('/offline-mode.js', {scope: '/'})
    .catch((err) => console.error(err))
}
