import { isDayOff } from '../calendar.utils'

jest.unmock('../calendar.utils')
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
    isoWeekday: jest.fn(() => Number(stringDate.slice(-2)) % 7),
  }
  return momentMock
}))

describe('isDayOff', () => {
  it('check if the date is day off (weekend or public holidays)', () => {
    expect(isDayOff('2018-10-14')).toEqual(false)
    expect(isDayOff('2018-10-15')).toEqual(false)
    expect(isDayOff('2018-10-16')).toEqual(false)
    expect(isDayOff('2018-10-17')).toEqual(false)
    expect(isDayOff('2018-10-18')).toEqual(false)
    expect(isDayOff('2018-10-19')).toEqual(false)
    expect(isDayOff('2018-10-20')).toEqual(true)
  })
})
