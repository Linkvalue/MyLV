import React from 'react'
import AppBar from '../components/app-bar/app-bar'
import Calendar from '../components/calendar/calendar'
import EntriesForm from '../components/entries-form/entries-form'
import UserForm from '../components/user-form/user-form'
import GenerateDoc from '../components/generate-doc/generate-doc'

export const App = (props) => (
  <div>
    <AppBar/>
    <UserForm />
    <Calendar/>
    <EntriesForm/>
    <GenerateDoc />
  </div>
)
