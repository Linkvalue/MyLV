import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { HolidayRow } from '../holidayRow.component'

jest.unmock('../holidayRow.component')

describe('PeriodsList', () => {
  let props
  beforeEach(() => {
    props = {
      classes: {},
      holiday: {
        date: '1942-01-01',
        id: 'bar',
        periods: [],
        status: 'pending',
      },
      partner: {
        firstName: 'Foo',
        lastName: 'Bar',
      },
      onHolidayDelete: jest.fn(),
      onClick: jest.fn(),
    }
  })

  const getWrapper = () => shallow(<HolidayRow {...props} />)

  it('should render properly', () => {
    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should render with menu when click menu button', () => {
    // Given
    const wrapper = getWrapper()

    // When
    wrapper.find('WithStyles(IconButton)').simulate('click', { currentTarget: 'foo', stopPropagation: jest.fn() })

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should not render menu button if disabled', () => {
    // Given
    props.disableMenu = true

    // When
    const wrapper = getWrapper()

    // Then
    expect(wrapper.find('WithStyles(IconButton)')).toHaveLength(0)
  })

  it('should not render menu button if status is not pending', () => {
    // Given
    props.holiday.status = 'rejected'

    // When
    const wrapper = getWrapper()

    // Then
    expect(wrapper.find('WithStyles(IconButton)')).toHaveLength(0)
  })

  it('should render deleted partner text if no partner prop', () => {
    // Given
    props.holiday.status = 'validated'
    props.displayPartnerName = true

    // When
    const wrapper = getWrapper()

    // Then
    expect(wrapper).toMatchSnapshot()
  })
})
