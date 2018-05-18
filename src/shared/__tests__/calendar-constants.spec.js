import { easterDate } from '../calendar.constants'

jest.unmock('../calendar.constants')
jest.spyOn(Date.prototype, 'getFullYear').mockImplementation(() => 2018)
jest.mock('moment', () => jest.fn((stringDate) => {
  let counter = 0
  const momentMock = {
    startOf: jest.fn(() => momentMock),
    subtract: jest.fn(() => momentMock),
    add: jest.fn(() => {
      counter += 1
      return momentMock
    }),
    format: jest.fn(() => `foo-${counter}`),
    daysInMonth: jest.fn(() => 30),
    day: jest.fn(() => Number(stringDate.slice(-2)) % 7),
  }
  return momentMock
}))

describe('publicHolidays', () => {
  it('calculate the Easter\'s date for 2018', () => {
    expect(easterDate()).toEqual(new Date('2018-04-01T00:00:00.000Z'))
  })
})
