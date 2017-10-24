import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import { MenuItem, Paper, TextField, withStyles } from 'material-ui'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import debounce from 'lodash.debounce'

function renderInput (inputProps) {
  const { classes, autoFocus, value, ref, label, ...other } = inputProps

  return (
    <TextField
      autoFocus={autoFocus}
      className={classes.textField}
      value={value}
      label={label}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  )
}

function renderSuggestionsContainer (options) {
  const { containerProps, children } = options

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  )
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
})

class Autocomplete extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      value: '',
    }
  }

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(this.props.getSuggestionValue(suggestion), query)
    const parts = parse(this.props.getSuggestionValue(suggestion), matches)

    return (
      <MenuItem selected={isHighlighted} component='div'>
        <div>
          {parts.map((part, index) =>
            part.highlight ? (
              <b key={index}>
                {part.text}
              </b>
            ) : (
              <span key={index}>
                {part.text}
              </span>
            )
          )}
        </div>
      </MenuItem>
    )
  }

  handleChange = (event, { newValue }) => this.setState({ value: newValue })

  render () {
    const {
      label,
      classes,
      suggestions,
      getSuggestionValue,
      fetchSuggestions,
      clearSuggestions,
      onChange,
      debounceTime,
    } = this.props

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={suggestions}
        onSuggestionsFetchRequested={debounceTime ? debounce(fetchSuggestions, debounceTime) : fetchSuggestions}
        onSuggestionsClearRequested={clearSuggestions}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={onChange}
        renderSuggestion={this.renderSuggestion}
        inputProps={{
          label,
          autoFocus: true,
          classes,
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    )
  }
}

Autocomplete.propTypes = {
  classes: PropTypes.object,
  suggestions: PropTypes.array.isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  clearSuggestions: PropTypes.func.isRequired,
  getSuggestionValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  debounceTime: PropTypes.number,
}

Autocomplete.defaultProps = {
  debounceTime: 300,
}

export default withStyles(styles)(Autocomplete)
