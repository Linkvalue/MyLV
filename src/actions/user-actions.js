export const SAVE_USER = 'SAVE_USER'

export const userEntry = (firstName, lastName) => ({
  type: SAVE_USER,
  payload: {firstName, lastName}
})
