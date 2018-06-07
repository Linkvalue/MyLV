import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AlertSnack from './alertSnack.component'
import { dissmissAlert, displayNextAlert } from '../display.actions'

const mapStateToProps = state => ({
  alert: state.display.alerts.current,
  open: state.display.alerts.open,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  dissmissAlert,
  displayNextAlert,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AlertSnack)
