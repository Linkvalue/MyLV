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
      proofExpirationDate: 0,
    }
  })

  it('should render properly', () => {
    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should notify user when a valid proof is already uploaded', () => {
    // Given
    jest.spyOn(Date, 'now').mockImplementation(() => 42)
    props.proofExpirationDate = Date.now() + 69

    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
    Date.now.mockRestore()
  })
})
