import { getPeriodDayCount } from '../holidays.utils'

jest.unmock('moment')
jest.unmock('../holidays.utils')

describe('holidays.utils', () => {
  describe('#getPeriodDayCount()', () => {
    it('should return 0 if date is invalid', () => {
      // When
      const dayCount = getPeriodDayCount({ startDate: '2018-06-04', endDate: '2018-06-00' })

      // Then
      expect(dayCount).toEqual(0)
    })

    it('should return 0 if end date is before start date', () => {
      // When
      const dayCount = getPeriodDayCount({ startDate: '2018-06-04', endDate: '2018-06-03' })

      // Then
      expect(dayCount).toEqual(0)
    })

    it('should return correct count otherwise', () => {
      // When
      const dayCount = getPeriodDayCount({ startDate: '2018-06-04', endDate: '2018-06-06' })

      // Then
      expect(dayCount).toEqual(2)
    })

    it('should not count weekend days', () => {
      // When
      const dayCount = getPeriodDayCount({ startDate: '2018-06-03', endDate: '2018-06-06' })

      // Then
      expect(dayCount).toEqual(2)
    })
  })
})
