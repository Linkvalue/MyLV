import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { HolidayRequestPage } from '../holidayRequest.page'

jest.unmock('../holidayRequest.page')

describe('HolidayRequestPage', () => {
  let props
  beforeEach(() => {
    props = {
      postHoliday: jest.fn(),
    }
  })

  const getWrapper = () => shallow(<HolidayRequestPage {...props} />)

  it('should render properly', () => {
    // When
    const wrapper = shallow(getWrapper().prop('render')({ children: <div>Foo</div> }))

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
