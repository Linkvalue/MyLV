import React, {Component} from 'react'
import { connect } from 'react-redux'

import { addLabel } from '../../actions/worklog-actions'
import styles from './labels-form.scss'

const mapStateToProps = (state) => ({
  ...state.worklog
})

const mapDispatchToProps = (dispatch) => {
  return {
    addLabel: (label, color) => {
      dispatch(addLabel(label, color))
    }
  }
}

class LabelsForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      labelName: '',
      labelColor: '',
      error: ''
    }
  }

  handleInputChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleInputSubmit (e) {
    e.preventDefault()

    const { labelName, labelColor } = this.state

    if (labelName !== '' && labelColor !== '') {
      if (!/^[A-F0-9]{6}$/.test(labelColor)) {
        this.setState({
          error: 'Invalid color, format is 000000'
        })
      } else {
        this.props.addLabel(labelName, `#${labelColor}`)
        this.setState({
          error: ''
        })
      }
    } else {
      this.setState({
        error: 'All fields are required'
      })
    }
  }

  render () {
    return (
      <form className={styles.labelsForm} onSubmit={(e) => this.handleInputSubmit(e)}>
        <div className={styles['mdl-card__title']}>
          <h2 className={styles['mdl-card__title-text']}>Ajouter un label</h2>
        </div>
        <div className={styles.labelsFormText}>
          <div className={styles.labelsFormTextfield}>
            <input
              className={styles['mdl-textfield__input']}
              type='text'
              name='labelName'
              autoFocus
              required
              onChange={(e) => this.handleInputChange(e)}/>
            <label
              className={styles['mdl-textfield__label']}
              for='labelName'>
              Nom
            </label>
          </div>
          <div className={styles.labelsFormTextfield}>
            <input
              className={styles['mdl-textfield__input']}
              type='text'
              name='labelColor'
              autoFocus
              required
              onChange={(e) => this.handleInputChange(e)}/>
            <label
              className={styles['mdl-textfield__label']}
              htmlFor='labelColor'>
              Code couleur
            </label>
          </div>
          <p>{this.state.error}</p>
        </div>
        <div className={styles.labelsFormActions}>
          <input
            className={styles.labelsFormSubmit}
            type='submit'
            value='Créer'/>
        </div>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelsForm)
