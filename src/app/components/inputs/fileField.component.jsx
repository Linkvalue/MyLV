import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Chip, withStyles } from 'material-ui'
import { PictureAsPdf } from 'material-ui-icons'

const styles = theme => ({
  uploadButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  uploadInput: {
    display: 'none',
  },
  uploadChip: {
    marginRight: theme.spacing.unit * 2,
  },
})

class FileField extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      preview: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.input.value !== nextProps.input.value &&
        nextProps.input.value[0] &&
        nextProps.input.value[0].type !== 'application/pdf'
    ) {
      const reader = new window.FileReader()
      reader.onload = e => this.setState({ preview: e.target.result })
      reader.readAsDataURL(nextProps.input.value[0])
    }
  }

  render() {
    const { classes, label, input: { value, ...input } } = this.props

    let fileDetails
    if (value && value[0]) {
      const isPdfFile = value[0].type === 'application/pdf'
      fileDetails = (
        <Chip
          className={classes.uploadChip}
          avatar={isPdfFile ? <Avatar><PictureAsPdf /></Avatar> : <Avatar src={this.state.preview} />}
          label={value[0].name}
        />
      )
    }

    return (
      <div className={classes.uploadButtonWrapper}>
        {fileDetails}
        <input className={classes.uploadInput} type="file" id={input.name} {...input} />
        <label htmlFor={input.name}>
          <Button variant="raised" component="span">
            {label}
          </Button>
        </label>
      </div>
    )
  }
}

FileField.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  accept: PropTypes.string.isRequired,
}

export default withStyles(styles)(FileField)
