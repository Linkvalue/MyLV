import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import { PartnersPage } from '../partners.page'

jest.unmock('../partners.page')

describe('PartnersPage', () => {
  let props

  const getWrapper = () => shallow(<PartnersPage {...props} />)

  beforeEach(() => {
    props = {
      fetchPartners: jest.fn(),
      notifyAllPartners: jest.fn(),
      push: jest.fn(),
      partners: [{
        id: 'my_anaconda_dont',
        firstName: 'hello',
        lastName: 'world',
        entryCounts: {
          production: 9,
        },
        lunchesCount: 10,
        mealVouchers: 21,
      }, {
        id: 'booyah',
        firstName: 'foo',
        lastName: 'bar',
        entryCounts: {
          paidHolidays: 10,
          unpaidHolidays: 42,
        },
        isWorklogComplete: true,
        lunchesCount: 42,
        mealVouchers: 19,
      }],
      isLoading: false,
      classes: {
        incompleteWorklog: 'incompleteWorklog',
      },
      pageCount: 10,
      limit: 25,
      location: {
        search: '',
      },
    }
  })

  it('should render partners list', () => {
    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('should render loader when fetching', () => {
    // Given
    props.isLoading = true

    // When
    const wrapper = getWrapper()

    // Then
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
