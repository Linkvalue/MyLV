import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from 'material-ui'

import { loginDone, fetchUserData } from '../auth.actions'

const mapDispatchToProps = dispatch => bindActionCreators({
  loginDone,
  fetchUserData,
}, dispatch)

const styles = theme => ({
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: `calc(100% + ${theme.spacing.unit * 6}px)`,
    backgroundColor: theme.palette.grey[200],
    margin: -theme.spacing.unit * 3,
  },
  errorIcon: {
    width: '200px',
    height: '200px',
    fill: theme.palette.grey[400],
  },
  errorText: {
    marginTop: '3rem',
    fontSize: '1.7rem',
    color: theme.palette.grey[400],
    lineHeight: '1.5',
    textAlign: 'center',
  },
})

class AuthCallbackPage extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      error: false,
    }
  }

  componentWillMount() {
    if (!this.getAuthCode()) {
      this.setState({
        error: true,
      })
    }
  }

  componentDidMount() {
    this.props.loginDone(this.getAuthCode())
  }

  getAuthCode() {
    const [, code] = /code=(\w+)/.exec(this.props.location.search) || []
    return code
  }

  render() {
    const { classes } = this.props

    if (this.state.error) {
      return (
        <div className={`mdl-layout__content ${classes.errorContainer}`}>
          <svg className={classes.errorIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 510">
            <path
              d="M255 0C114.75 0 0 114.75 0 255s114.75 255 255 255 255-114.75 255-255S395.25 0 255 0zm25.5
                 382.5h-51v-51h51v51zm0-102h-51v-153h51v153z"
            />
          </svg>
          <div className={classes.errorText}>
            Sorry, something went wrong during authentication :(
          </div>
        </div>
      )
    }

    return null
  }
}

AuthCallbackPage.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  loginDone: PropTypes.func.isRequired,
}

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(AuthCallbackPage))
