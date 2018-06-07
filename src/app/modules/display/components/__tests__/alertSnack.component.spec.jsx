import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import AlertSnack from '../alertSnack.component'

jest.unmock('../alertSnack.component')

describe('AlertSnack', () => {
  let props

  const getWrapper = () => shallow(<AlertSnack {...props} />)

  beforeEach(() => {
    props = {
      alert: {
        id: 'foo',
        type: 'ALERT_INFO',
        message: 'bar',
      },
      open: true,
      dissmissAlert: jest.fn(),
      displayNextAlert: jest.fn(),
    }
  })

  it('should render properly', () => {
    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
