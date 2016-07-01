import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { userEntry } from '../../actions/user-actions'

const styles = {
  label: {
    marginRight: 20
  },
  inputContainer: {
    marginBottom: 10
  },
  input: {
    padding: 5
  },
  error: {
    color: 'red'
  },
  submit: {
    padding: 10
  }
}

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

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
      <div>
        <h2>Partner information</h2>
        <p style={styles.inputContainer}>
          <label style={styles.label} for='lastName'>Nom</label>
          <input type='text'
            style={styles.input}
            name='lastName'
            ref='lastName'
            autoFocus
            required
            onChange={this.handleInputChange} />
        </p>
        <p style={styles.inputContainer}>
          <label style={styles.label} for='firstName'>Prénom</label>
          <input type='text'
            style={styles.input}
            name='firstName'
            ref='firstName'
            autoFocus={false}
            required
            onChange={this.handleInputChange} />
        </p>
        <p style={styles.error}>{this.state.error}</p>
        <button onClick={this.handleSubmit} style={styles.submit}>Submit</button>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Form)
