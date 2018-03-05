import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { LunchesPage } from '../lunches.page'

jest.unmock('../lunches.page')

describe('LunchesPage', () => {
  let props

  const getWrapper = () => shallow(<LunchesPage {...props} />)

  beforeEach(() => {
    props = {
      lunches: [{
        id: 'foo',
      }],
      fetchUserLunches: jest.fn(),
      deleteLunch: jest.fn(),
      isLoading: false,
    }
  })

  it('should render loader if loading', () => {
    // Given
    props.isLoading = true

    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should render lunch list if not loading', () => {
    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
