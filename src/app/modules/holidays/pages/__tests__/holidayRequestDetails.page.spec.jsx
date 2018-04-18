import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { HolidayRequestDetails } from '../holidayRequestDetails.page'
import { getPeriodDayCount } from '../../../../../shared/holidays.utils'

jest.unmock('../holidayRequestDetails.page')

describe('HolidayRequestPage', () => {
  let props
  beforeEach(() => {
    props = {
      fetchHolidayRequestDetails: jest.fn(),
      changeHolidayRequestStatus: jest.fn(),
      holidayRequest: {
        user: 'foo',
        title: 'hello',
        comment: 'world',
        periods: [{
          _id: 'qux',
          label: 'paidHolidays',
          startDate: '2012-01-01',
          endDate: '2012-01-02',
        }],
      },
      user: { id: 'foo' },
      isLoading: false,
      match: {
        params: {
          id: 'bar',
        },
      },
      partner: {
        firstName: 'james',
        lastName: 'bond',
      },
      classes: {},
    }

    getPeriodDayCount.mockImplementation(() => 42)
  })

  const getWrapper = () => shallow(<HolidayRequestDetails {...props} />)

  it('should render properly', () => {
    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should render in loading state', () => {
    // Given
    props.isLoading = true

    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should render not found', () => {
    // Given
    props.holidayRequest = null

    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should render other\'s holiday request', () => {
    // Given
    props.holidayRequest.user = 'bar'

    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
