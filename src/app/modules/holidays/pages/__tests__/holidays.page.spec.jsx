import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { HolidaysPage } from '../holidays.page'

jest.unmock('../holidays.page')

describe('HolidaysPage', () => {
  let props
  beforeEach(() => {
    props = {
      fetchHolidays: jest.fn(),
      push: jest.fn(),
      isLoading: false,
      classes: {},
      holidays: [{
        id: 'foo',
        date: 'bar',
        status: 'pending',
        periods: [{ baz: 'qux' }],
      }, {
        id: 'baz',
        date: 'qux',
        status: 'validated',
        periods: [],
      }],
      limit: 25,
      pageCount: 1,
      location: {
        search: '',
      },
    }
  })

  const getWrapper = () => shallow(<HolidaysPage {...props} />)

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

  it('should render empty holidays list', () => {
    // Given
    props.holidays = []

    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
