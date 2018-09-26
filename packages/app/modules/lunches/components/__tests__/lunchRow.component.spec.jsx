import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { LunchRow } from '../lunchRow.component'

jest.unmock('../lunchRow.component')

describe('LunchRow', () => {
  let props

  const getWrapper = () => shallow(<LunchRow {...props} />)

  beforeEach(() => {
    props = {
      lunch: {
        id: 'foo',
        label: 'bar',
        date: '2012-01-01',
        attendees: [],
      },
      classes: {},
      onLunchDelete: jest.fn(),
    }
  })

  it('should render properly', () => {
    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should open menu on menu button click', () => {
    // Given
    const wrapper = getWrapper()

    // When
    wrapper.find('WithStyles(IconButton)').simulate('click', { currentTarget: 'foo' })

    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
