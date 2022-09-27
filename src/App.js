import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { config as AmapReactConfig } from '@amap/amap-react'
import './assets/css/global.css'
import './App.css'

import Login from './views/login'
import Home from './views/home'

AmapReactConfig.version = '2.0'
AmapReactConfig.key = 'a262e007b273b03941d3e551974dbbc8'
AmapReactConfig.plugins = [
  'AMap.ToolBar',
  'AMap.MoveAnimation'
]
export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' component={Home} />
        <Route path='/login' component={Login} />
      </Switch>
    )
  }
}



