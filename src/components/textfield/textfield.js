import React from 'react'
import classNames from 'classnames'

import styles from './textfield.scss'

export default (field) => (
  <div className={classNames(styles['mdl-textfield'], styles['mdl-textfield--floating-label'], {
    [styles['is-dirty']]: field.input.value,
    [styles['is-focused']]: field.meta.active,
    [styles['is-invalid']]: field.meta.error
  })}>
    <input
      {...field.input}
      className={styles['mdl-textfield__input']}
      required/>
    <label
      className={styles['mdl-textfield__label']}
      htmlFor={field.name}>
      {field.label}
    </label>
    <span className={styles['mdl-textfield__error']}>{field.meta.error}</span>
  </div>
)
