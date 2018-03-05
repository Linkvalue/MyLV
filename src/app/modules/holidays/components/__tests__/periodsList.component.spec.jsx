import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { PeriodsList } from '../periodsList.component'

jest.unmock('../periodsList.component')

describe('PeriodsList', () => {
  let props
  beforeEach(() => {
    props = {
      classes: {
        periodsList: 'periods-list',
      },
      fields: {
        get: jest.fn(index => ({ _id: index })),
        push: jest.fn(),
        remove: jest.fn(),
        map: jest.fn(fn => [fn({
          label: 'foo',
          startDate: 'bar',
          endDate: 'baz',
          _id: 123,
        }, 0)]),
      },
    }
  })

  const getWrapper = () => shallow(<PeriodsList {...props} />)

  it('should render properly', () => {
    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
