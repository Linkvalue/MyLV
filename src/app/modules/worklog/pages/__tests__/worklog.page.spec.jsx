import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { WorklogPage } from '../worklog.page'
import config from '../../../../config'

jest.mock('../../../../config', () => ({}))
jest.unmock('../worklog.page')

describe('WorklogPage', () => {
  let props

  const getWrapper = () => shallow(<WorklogPage {...props} />)

  beforeEach(() => {
    props = {
      classes: {},
      shouldRemindProcess: false,
      canPrint: false,
      push: jest.fn(),
      disableProofOfTransportDialog: jest.fn(),
      shouldDisplayProofOfTransportDialog: false,
      hasInvalidTransportProof: false,
    }

    config.featureFlipping = {
      transport: false,
    }
  })

  it('should render properly', () => {
    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should render transport dialog', () => {
    // Given
    props.hasInvalidTransportProof = true
    props.shouldDisplayProofOfTransportDialog = true
    config.featureFlipping.transport = true

    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should display process reminder', () => {
    // Given
    props.shouldRemindProcess = true

    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
