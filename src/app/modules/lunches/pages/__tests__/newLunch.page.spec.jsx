import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { NewLunchPage } from '../newLunch.page'

jest.unmock('../newLunch.page')

describe('NewLunchPage', () => {
  let props

  const getWrapper = () => shallow(<NewLunchPage {...props} />)

  beforeEach(() => {
    props = {
      postLunch: jest.fn(),
    }
  })

  it('should render new lunch form', () => {
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
