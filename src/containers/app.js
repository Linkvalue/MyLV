import React from 'react'
import AppBar from '../components/app-bar/app-bar'
import Calendar from '../components/calendar/calendar'
import Form from '../components/form/user-form'
import GenerateDoc from '../components/document/generate-doc'

export const App = (props) => (
  <div>
    <AppBar/>
    <Calendar month='2016-06' day={29}/>
    <Form />
    <GenerateDoc />
  </div>
)
