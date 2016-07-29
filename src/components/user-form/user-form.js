import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './user-form.scss'
import { userEntry } from '../../actions/user-actions'

const mapDispatchToProps = (dispatch) => {
  return {
    userEntry: (firstName, lastName) => {
      dispatch(userEntry(firstName, lastName))
    }
  }
}

class Form extends Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      error: ''
    }
  }

  handleInputChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })

    this.handleInputSubmit()
  }

  handleInputSubmit () {
    const { firstName, lastName } = this.state

    if (firstName !== '' && lastName !== '') {
      this.props.userEntry(firstName, lastName)
      this.setState({
        error: ''
      })
    } else {
      this.setState({
        error: 'All fields are required'
      })
    }
  }

  render () {
    return (
      <form className={styles.userForm} onSubmit={() => this.handleSubmit()}>
        <div className={styles['mdl-card__title']}>
          <h2 className={styles['mdl-card__title-text']}>Partner information</h2>
        </div>
        <div className={styles['mdl-card__supporting-text']}>
          <div className={styles['mdl-textfield']}>
            <input
              className={styles['mdl-textfield__input']}
              type='text'
              name='lastName'
              autoFocus
              required
              onChange={(e) => this.handleInputChange(e)}/>
            <label
              className={styles['mdl-textfield__label']}
              for='lastName'>
              Nom
            </label>
          </div>
          <div className={styles['mdl-textfield']}>
            <input
              className={styles['mdl-textfield__input']}
              type='text'
              name='firstName'
              autoFocus
              required
              onChange={(e) => this.handleInputChange(e)}/>
            <label
              className={styles['mdl-textfield__label']}
              htmlFor='firstName'>
              Prénom
            </label>
          </div>
        </div>
        <p>{this.state.error}</p>
      </form>
    )
  }
}

export default connect(null, mapDispatchToProps)(Form)
