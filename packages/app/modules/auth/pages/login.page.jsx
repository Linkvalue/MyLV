import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { withStyles, Button } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import { appName } from '@cracra/config/app'

import { lvConnect } from '../lvconnect'
import bgUrl from '../../../assets/images/login-bg.svg'
import logoUrl from '../../../assets/images/logo-my-lv.svg'
import logoLVUrl from '../../../assets/images/logo-lv.svg'

const mapStateToProps = state => ({
  isConnected: !!state.auth.user,
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
  logoMyLV: {
    maxWidth: theme.spacing.unit * 40,
    marginBottom: theme.spacing.unit * 10,
  },
  logoLV: {
    position: 'absolute',
    bottom: theme.spacing.unit * 5,
    marginTop: theme.spacing.unit * 10,
    height: theme.spacing.unit * 5,
    [theme.breakpoints.up('md')]: {
      right: theme.spacing.unit * 5,
      height: theme.spacing.unit * 10,
    },
  },
})

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
}, dispatch)

class LoginPage extends Component {
  componentWillReceiveProps(props) {
    if (props.isConnected) {
      this.props.push('/')
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.loginPage}>
        <Helmet>
          <title>Connexion | {appName}</title>
        </Helmet>
        <img src={logoUrl} alt="Logo MyLV" className={classes.logoMyLV} />
        <Button color="primary" variant="raised" onClick={() => lvConnect.login()}>Login with LVConnect</Button>
        <img src={logoLVUrl} alt="Logo LinkValue" className={classes.logoLV} />
      </div>
    )
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  isConnected: PropTypes.bool.isRequired,
  push: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage))
