import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { HolidayRequestEditPage } from '../holidayRequestEdit.page'

jest.unmock('../holidayRequestEdit.page')

describe('HolidayRequestEditPage', () => {
  let props
  beforeEach(() => {
    props = {
      putHoliday: jest.fn(),
      holidayRequest: {
        user: 'foo',
        periods: [{
          startDate: '2012-01-02',
          endDate: '2012-01-03',
        }],
      },
    }
  })

  const getWrapper = () => shallow(<HolidayRequestEditPage {...props} />)

  it('should render properly', () => {
    // When
    const wrapper = shallow(getWrapper().prop('render')({ children: <div>Foo</div> }))

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
