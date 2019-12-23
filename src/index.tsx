import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'

import { App } from './App'
import { ContainerProvider } from './config/di'
import { history } from './stores/RouterStore'

ReactDOM.render(
  (
    <ContainerProvider>
      <Router history={history}>
        <App />
      </Router>
    </ContainerProvider>
  ),
  document.getElementById('root'),
)
