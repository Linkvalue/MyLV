import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { EditLunchPage } from '../editLunch.page'

jest.unmock('../editLunch.page')

describe('EditLunchPage', () => {
  let props

  const getWrapper = () => shallow(<EditLunchPage {...props} />)

  beforeEach(() => {
    props = {
      match: {
        params: {
          id: 'foo',
        },
      },
      lunch: {
        label: 'hello',
        date: '2012-01-01',
      },
      putLunch: jest.fn(),
      fetchLunchDetails: jest.fn(),
      isLoading: false,
    }
  })

  it('should render loading screen if loading', () => {
    // Given
    props.isLoading = true

    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should render edit form if not loading', () => {
    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should pass render function to edit form', () => {
    // When
    const wrapper = shallow(getWrapper().prop('render')({ children: <div>Foo</div> }))

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
