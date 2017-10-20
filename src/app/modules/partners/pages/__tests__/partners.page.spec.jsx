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
      push: jest.fn(),
      partners: [{
        id: 'my_anaconda_dont',
        firstName: 'hello',
        lastName: 'world',
        entryCounts: {
          foo: 10,
        },
      }],
      isLoading: false,
      labels: {
        foo: 'bar',
        baz: 'qux',
      },
      classes: {},
      pageCount: 10,
      limit: 25,
      match: {
        params: {
          page: '1',
        },
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
