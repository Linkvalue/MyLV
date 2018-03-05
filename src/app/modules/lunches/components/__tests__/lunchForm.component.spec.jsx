import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { LunchForm } from '../lunchForm.component'

jest.unmock('../lunchForm.component')

describe('LunchForm', () => {
  let props

  const getWrapper = () => shallow(<LunchForm {...props} />)

  beforeEach(() => {
    props = {
      valid: true,
      pristine: true,
      handleSubmit: jest.fn(),
      render: jest.fn(({ children }) => <React.Fragment>{children}</React.Fragment>),
      classes: {},
    }
  })

  it('should render properly', () => {
    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
