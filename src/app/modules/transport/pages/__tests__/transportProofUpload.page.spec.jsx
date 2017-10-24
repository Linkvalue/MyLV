import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { TransportProofPage } from '../transportProofUpload.page'

jest.unmock('../transportProofUpload.page')

describe('TransportProofPage', () => {
  let props

  const getWrapper = () => shallow(<TransportProofPage {...props} />)

  beforeEach(() => {
    props = {
      classes: {},
      valid: false,
      handleSubmit: jest.fn(),
      setExpirationDateToCurrentMonth: jest.fn(),
      hasInvalidTransportProof: false,
    }
  })

  it('should render properly', () => {
    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
