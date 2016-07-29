import React from 'react'

import AppBar from '../components/app-bar/app-bar'
import Calendar from '../components/calendar/calendar'
import EntriesForm from '../components/entries-form/entries-form'
import UserForm from '../components/user-form/user-form'
import LabelsForm from '../components/labels-form/labels-form'
import Printer from '../components/printer/printer'
import styles from './app.scss'

export const App = (props) => (
  <div>
    <AppBar/>
    <div className={styles.mainGrid}>
      <Calendar/>
      <UserForm />
      <EntriesForm/>
      <LabelsForm/>
    </div>
    <Printer/>
  </div>
)
