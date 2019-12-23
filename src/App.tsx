import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Dynamic } from './Dynamic'
import { ModuleA } from './ModuleA'
import { ModuleB } from './ModuleB'
import { MainPage } from './pages/MainPage'


export const App = () => (
  <Switch>
    <Route path="/main" component={MainPage} />
    <Route path="/module-a" component={ModuleA} />
    <Route path="/module-b" component={ModuleB} />
    <Route path="/page/:id" component={Dynamic} />
  </Switch >
)
