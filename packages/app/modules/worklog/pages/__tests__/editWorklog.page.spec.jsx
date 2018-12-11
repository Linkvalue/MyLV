import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import config from '@cracra/config/app'

import { EditWorklogPage } from '../editWorklog.page'

jest.mock('@cracra/config/app', () => ({ lvconnect: {} }))
jest.unmock('../editWorklog.page')

describe('WorklogPage', () => {
  let props

  const getWrapper = () => shallow(<EditWorklogPage {...props} />)

  beforeEach(() => {
    props = {
      classes: {},
      shouldRemindProcess: false,
      canPrint: true,
      isTabletOrMobile: false,
      isOffline: false,
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

  it('should redirect if missing client info', () => {
    // Given
    props.canPrint = false

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
