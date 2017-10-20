import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Avatar, List, ListItem, ListItemIcon, ListItemText, ListSubheader, withStyles } from 'material-ui'
import { Add, Error } from 'material-ui-icons'

import PartnerDialog from './partnerDialog.component'

const mapStateToProps = state => ({ partners: state.partners.partnersById })

const styles = theme => ({
  errorListItem: {
    color: theme.palette.error[500],
  },
})

class PartnerList extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      openDialog: false,
    }
  }

  handleDialogOpen = () => this.setState({ openDialog: true })

  handleDialogClose = () => this.setState({ openDialog: false })

  render () {
    const { fields, partners, meta: { error, submitFailed }, classes } = this.props

    return (
      <List subheader={<ListSubheader>Participants</ListSubheader>}>
        {submitFailed && error && (
          <ListItem dense>
            <ListItemIcon className={classes.errorListItem}>
              <Error />
            </ListItemIcon>
            <ListItemText inset primary={error} className={classes.errorListItem} />
          </ListItem>
        )}
        {fields.map((fieldId, index) => {
          const partner = partners[fields.get(index)]
          const fullName = `${partner.firstName} ${partner.lastName}`
          return (
            <ListItem dense key={fieldId}>
              <Avatar alt={fullName} src={partner.profilePictureUrl} />
              <ListItemText inset primary={fullName} />
            </ListItem>
          )
        })}
        <ListItem dense button onClick={this.handleDialogOpen}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText inset primary='Ajouter un nouveau participant' />
        </ListItem>
        <PartnerDialog
          title='Ajout de participant'
          description="Taper le nom d'un partner à ajouter à la liste des participants au déjeuner"
          action='Ajouter'
          open={this.state.openDialog}
          onRequestClose={this.handleDialogClose}
          onPartnerSelected={partnerId => fields.push(partnerId)}
        />
      </List>
    )
  }
}

PartnerList.propTypes = {
  classes: PropTypes.object.isRequired,
  partners: PropTypes.object.isRequired,
  fields: PropTypes.shape({
    push: PropTypes.func.isRequired,
    map: PropTypes.func.isRequired,
    get: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    submitFailed: PropTypes.bool,
  }).isRequired,
}

export default connect(mapStateToProps)(withStyles(styles)(PartnerList))
