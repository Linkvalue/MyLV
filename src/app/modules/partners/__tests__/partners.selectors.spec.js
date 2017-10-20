import { getPartnersList, getPartnersSearchResults } from '../partners.selectors'

jest.unmock('../partners.selectors')

describe('partners.selectors', () => {
  describe('getPartnersSearchResults', () => {
    it('should return partners search results', () => {
      // Given
      const state = {
        partners: {
          partnersById: { foo: { id: 'foo' } },
          partnersSearchResults: ['foo']
        }
      }

      // When
      const list = getPartnersSearchResults(state)

      // Then
      expect(list).toEqual([{ id: 'foo' }])
    })
  })

  describe('getPartnersList', () => {
    it('should return partners list', () => {
      // Given
      const state = {
        partners: {
          partnersById: { foo: { id: 'foo' } },
          partnersList: ['foo']
        }
      }

      // When
      const list = getPartnersList(state)

      // Then
      expect(list).toEqual([{ id: 'foo' }])
    })
  })
})
