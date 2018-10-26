import React from 'react'
import PropTypes from 'prop-types'

import { featureFlipping } from '../config'

const FeatureFlipping = ({ feature, children }) =>
  (featureFlipping[feature] ? <React.Fragment>{children}</React.Fragment> : null)

FeatureFlipping.propTypes = {
  feature: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default FeatureFlipping
