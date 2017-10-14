import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Autocomplete from './autocomplete.component'
import { getPartnersSearchResults } from '../modules/partners/partners.selectors'
import { fetchPartnersSearch, clearPartnersSearch } from '../modules/partners/partners.actions'

const mapStateToProps = state => ({
  partners: getPartnersSearchResults(state)
})

const mapDispatchToProps = (dispatch, { excludeSelf }) => bindActionCreators({
  fetchPartnersSearch: ({ value }) => fetchPartnersSearch(value, excludeSelf),
  clearPartnersSearch
}, dispatch)

const renderPartnerName = partner => `${partner.firstName} ${partner.lastName}`

const PartnerAutocomplete = ({ partners, onChange, ...actions }) => (
  <Autocomplete
    suggestions={partners}
    fetchSuggestions={actions.fetchPartnersSearch}
    clearSuggestions={actions.clearPartnersSearch}
    getSuggestionValue={renderPartnerName}
    onChange={onChange}
  />
)

PartnerAutocomplete.propTypes = {
  partners: PropTypes.array.isRequired,
  excludeSelf: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  fetchPartnersSearch: PropTypes.func.isRequired
}

PartnerAutocomplete.defaultProps = {
  excludeSelf: false
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnerAutocomplete)
