import theme from './theme'

export const DETECT_DEVICE = 'DETECT_DEVICE'
export const detectDevice = () => ({
  type: DETECT_DEVICE,
  payload: {
    isMobile: window.innerWidth <= theme.breakpoints.values.sm,
    isTablet: window.innerWidth > theme.breakpoints.values.sm && window.innerWidth <= theme.breakpoints.values.md,
    isDesktop: window.innerWidth > theme.breakpoints.values.md,
  },
})

export const SWITCH_OFFLINE_MODE = 'SWITCH_OFFLINE_MODE'
export const switchOfflineMode = value => ({
  type: SWITCH_OFFLINE_MODE,
  payload: { value },
})

export const PUSH_ALERT = 'PUSH_ALERT'
export const pushAlert = alert => ({
  type: PUSH_ALERT,
  payload: {
    ...alert,
    id: btoa(Date.now()),
  },
})

export const DISSMISS_ALERT = 'DISSMISS_ALERT'
export const dissmissAlert = () => ({
  type: DISSMISS_ALERT,
})

export const DISPLAY_NEXT_ALERT = 'DISPLAY_NEXT_ALERT'
export const displayNextAlert = () => ({
  type: DISPLAY_NEXT_ALERT,
})
