import React from 'react'
import ReactDOM from 'react-dom'

import { configureStore } from './store/configure-store'
import { Root } from './containers/root'

const store = configureStore()

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('cracra')
)
