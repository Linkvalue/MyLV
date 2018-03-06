import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { PersonalHolidaysPage } from '../personalHolidays.page'

jest.mock('moment', () => jest.fn(date => ({ format: jest.fn(() => date) })))
jest.unmock('../personalHolidays.page')

describe('PersonalHolidaysPage', () => {
  let props
  beforeEach(() => {
    props = {
      fetchPersonalHolidays: jest.fn(),
      push: jest.fn(),
      deleteHoliday: jest.fn(),
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
    }
  })

  const getWrapper = () => shallow(<PersonalHolidaysPage {...props} />)

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
})
