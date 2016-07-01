import React, { Component } from 'react'
import { connect } from 'react-redux'
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
      <form onSubmit={() => this.handleSubmit()}>
        <h2>Partner information</h2>
        <p>
          <label for='lastName'>Nom</label>
          <input type='text'
            name='lastName'
            autoFocus
            required
            onChange={(e) => this.handleInputChange(e)} />
        </p>
        <p>
          <label for='firstName'>Prénom</label>
          <input type='text'
            name='firstName'
            required
            onChange={(e) => this.handleInputChange(e)} />
        </p>
        <p>{this.state.error}</p>
      </form>
    )
  }
}

export default connect(null, mapDispatchToProps)(Form)
