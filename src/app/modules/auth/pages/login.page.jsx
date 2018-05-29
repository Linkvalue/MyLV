import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Card, CardContent, Typography, withStyles } from 'material-ui'

import { lvConnect } from '../lvconnect'
import bgUrl from '../../../assets/images/login-bg.svg'
import logoUrl from '../../../assets/images/logo-lv.svg'

const mapStateToProps = state => ({
  isConnected: !!state.auth.user,
  error: state.auth.error,
})

const styles = theme => ({
  loginPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: `calc(100% + ${theme.spacing.unit * 6}px)`,
    boxSizing: 'border-box',
    background: `url(${bgUrl}) no-repeat`,
    backgroundSize: 'cover',
    margin: -theme.spacing.unit * 3,
  },
  loginButtonWrapper: {
    marginTop: theme.spacing.unit * 2,
  },
  logoLV: {
    marginBottom: theme.spacing.unit * 10,
  },
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
}, dispatch)

class LoginPage extends Component {
  componentDidMount() {
    lvConnect.mountLoginButton(this.loginButtonContainer)
  }

  componentWillReceiveProps(props) {
    if (props.isConnected) {
      this.props.push('/')
    }
  }

  render() {
    const { classes, error } = this.props

    return (
      <div className={classes.loginPage}>
        <img src={logoUrl} alt="Logo LinkValue" className={classes.logoLV} />
        <Card>
          <CardContent>
            <Typography variant="headline" component="h2" gutterBottom>
              Bienvenue sur MyLV
            </Typography>
            <div className={classes.loginButtonWrapper} ref={(el) => { this.loginButtonContainer = el }} />
            {error ? <Typography color="error">An error occurred during login</Typography> : null}
          </CardContent>
        </Card>
      </div>
    )
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  isConnected: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  push: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage))
