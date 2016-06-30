export const WORKLOG_EDIT_ENTRY = 'WORKLOG_EDIT_ENTRY'

export const editEntry = (date, label, worked) => ({
  type: WORKLOG_EDIT_ENTRY,
  payload: {date, label, worked}
})
