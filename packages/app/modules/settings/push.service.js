import { featureFlipping, push } from '../../config'
import { desktopNotificationsInstalled } from './settings.actions'

let pushWorker

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export const installPushNotifications = async (store) => {
  if (!navigator.serviceWorker || !featureFlipping.pushNotifications) {
    return
  }

  try {
    pushWorker = await navigator.serviceWorker.getRegistration('/')
    const subscription = await pushWorker.pushManager.getSubscription()
    const isSubscribed = !(subscription === null)
    store.dispatch(desktopNotificationsInstalled(isSubscribed))
  } catch (e) {
    console.error(e)
  }
}

export const enableDesktopNotifications = () => {
  if (!pushWorker) {
    return Promise.reject(new Error('Desktop notification not installed'))
  }

  return pushWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(push.publicKey),
  })
}

export const disableDesktopNotifications = () => {
  if (!pushWorker) {
    return Promise.reject(new Error('Desktop notification not installed'))
  }

  return pushWorker.pushManager.getSubscription()
    .then((subscription) => {
      if (subscription) {
        return subscription.unsubscribe()
      }

      return Promise.resolve()
    })
}
