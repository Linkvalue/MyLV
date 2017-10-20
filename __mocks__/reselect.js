module.exports = {
  createSelector: jest.fn(
    (...selectors) =>
      (...args) => selectors[selectors.length - 1](...selectors.slice(0, -1).map(partial => partial(...args)))
  )
}
