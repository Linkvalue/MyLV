import React from 'react'
import classNames from 'classnames'

import styles from './material-select.scss'

export default class MaterialSelect extends React.Component {
  constructor (props) {
    super(props)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleFocus () {
    this.props.input.onFocus()
    document.documentElement.addEventListener('click', () => this.props.input.onBlur(this.props.input.value), {
      once: true
    })
  }

  handleChoiceClick (choice) {
    this.props.input.onBlur(choice)
  }

  render () {
    const field = this.props

    return (
      <div className={classNames(styles['mdl-textfield'], styles['mdl-textfield--floating-label'], {
        [styles['is-dirty']]: field.input.value,
        [styles['is-focused']]: field.meta.active,
        [styles['is-invalid']]: field.meta.error
      })}>
        <div
          className={styles['mdl-textfield__input']}
          onClick={this.handleFocus}>
          {field.input.value}
        </div>
        <label
          className={styles['mdl-textfield__label']}
          htmlFor={field.name}>
          {field.label}
        </label>
        <span className={styles['mdl-textfield__error']}>{field.meta.error}</span>
        <ul
          className={classNames(styles.choices, { [styles['is-visible']]: field.meta.active })}
          htmlFor='demo-menu-lower-left'>
          {Object.keys(field.options).map((option) =>
            <li
              key={option}
              className={styles.choice}
              onClick={() => this.handleChoiceClick(option)}>
              {option}
            </li>)}
        </ul>
      </div>
    )
  }
}
