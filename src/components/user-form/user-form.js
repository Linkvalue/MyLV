import React, { Component } from 'react'
import ReactDOM from 'react-dom'
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

  handleInputChange () {
    const lastName = ReactDOM.findDOMNode(this.refs.lastName).value
    const firstName = ReactDOM.findDOMNode(this.refs.firstName).value

    this.setState({
      lastName: lastName,
      firstName: firstName
    })
  }

  handleSubmit () {
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
            ref='lastName'
            autoFocus
            required
            onChange={() => this.handleInputChange()} />
        </p>
        <p>
          <label for='firstName'>Prénom</label>
          <input type='text'
            name='firstName'
            ref='firstName'
            required
            onChange={() => this.handleInputChange()} />
        </p>
        <p>{this.state.error}</p>
        <button>Submit</button>
      </form>
    )
  }
}

export default connect(null, mapDispatchToProps)(Form)
