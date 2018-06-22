import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { appName } from '../../../config'
import Calendar from '../components/calendar.component'
import NotFound from '../../../components/notFound.component'

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  error: state.worklog.error,
  partner: state.partners.partnersById[id],
})

export const EditWorklogPage = ({
  partner,
  error,
  match: { params: { id } },
}) => {
  if (error) {
    return <NotFound />
  }

  return (
    <Fragment>
      <Helmet>
        <title>CRA de {partner ? `${partner.firstName} ${partner.lastName}` : ''} | {appName}</title>
      </Helmet>
      <Calendar partnerId={id} />
    </Fragment>
  )
}

EditWorklogPage.defaultProps = {
  partner: null,
}

EditWorklogPage.propTypes = {
  error: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  partner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }),
}

export default connect(mapStateToProps)(EditWorklogPage)
