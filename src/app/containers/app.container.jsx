import React from 'react'
import { withStyles } from 'material-ui'

import AppBar from '../components/appBar.component'
import AppDrawer from '../components/appDrawer.component'

const styles = theme => ({
  appRoot: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appContent: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    boxSizing: 'border-box',
    overflowY: 'auto',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  '@media print': {
    appContent: {
      marginTop: 0,
      padding: 0,
    },
  },
  '@global iframe': {
    border: 'none',
  },
})

class App extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      drawerOpen: false,
    }
  }

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true })
  }

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false })
  }

  render() {
    const { classes, children } = this.props

    return (
      <div className={classes.appRoot}>
        <div className={classes.appFrame}>
          <AppBar onDrawerOpen={this.handleDrawerOpen} />
          <AppDrawer open={this.state.drawerOpen} onDrawerClose={this.handleDrawerClose} />
          <div className={classes.appContent}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(App)
