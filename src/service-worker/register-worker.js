export function registerWorker () {
  if (!navigator.serviceWorker) {
    return
  }

  navigator.serviceWorker
    .register('/offline-mode.js')
    .catch((err) => console.error(err))
}
