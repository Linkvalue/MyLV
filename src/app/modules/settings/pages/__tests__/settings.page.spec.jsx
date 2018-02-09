import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { SettingsPage } from '../settings.page'

jest.unmock('../settings.page')

describe('SettingsPage', () => {
  let props

  const getWrapper = () => shallow(<SettingsPage {...props} />)

  beforeEach(() => {
    props = {
      togglePushNotifications: jest.fn(),
      toggleProofOfTransportDialog: jest.fn(),
      toggleProcessReminder: jest.fn(),
      settings: {
        desktopNotificationsInstalled: false,
        desktopNotificationsEnabled: false,
        shouldDisplayProofOfTransportDialog: false,
        shouldRemindProcess: false,
      },
    }
  })

  it('should render with all switches off', () => {
    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should render with all switches on', () => {
    // Given
    props.settings = {
      desktopNotificationsInstalled: true,
      desktopNotificationsEnabled: true,
      shouldDisplayProofOfTransportDialog: true,
      shouldRemindProcess: true,
    }

    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
