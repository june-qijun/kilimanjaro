import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer } from './src/rootReducer'
import { BrowserRouter, Route } from 'react-router-dom'
import { AppWrapper } from './src/container/app-container'
import { UserLogin } from './src/container/login-container'
import { LoginCallback } from './src/container/login-callback-container'
import { initState } from './data'
import './style.css'

export const store = createStore(rootReducer, initState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

render(
  <Provider store={store}>
    <BrowserRouter>
      <div style={{ height: '100%' }}>
        <Route exact path='/' component={AppWrapper} />
        <Route exact path='/login' component={UserLogin} />
        <Route exact path='/login/callback' component={LoginCallback} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))
