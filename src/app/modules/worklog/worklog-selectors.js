export const hasPendingChangesSelector = state => Object.keys(state.worklog.pending).length > 0
