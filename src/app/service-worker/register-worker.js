export function registerWorker() {
  if (!navigator.serviceWorker) {
    return
  }

  navigator.serviceWorker
    .register('/assets/scripts/offline-mode.js')
    .catch(err => console.error(err))
}
