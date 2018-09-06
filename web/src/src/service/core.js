import axios from 'axios'
import { login as loginAction } from '../rootReducer'
import { store } from '../../index'
import Cookies from 'js-cookie'
axios.defaults.withCredentials = true

const hostUrl = 'http://localhost:7001'

function get(url) {
  return new Promise(resolve => {
    axios.get(url).then(rep => {
      resolve(rep)
    }).catch(e => {
      if (e.response.status === 401) {
        store.dispatch(loginAction(false))
      }
    })
  })
}

function post(url, params) {
  return new Promise(resolve => {
    axios.post(url, params, {
      headers: {
        'x-csrf-token': Cookies.get('csrfToken')
      }
    }).then(rep => {
      console.log(rep)
      resolve(rep)
    }).catch(e => {
      if (e.response.status === 401) {
        store.dispatch(loginAction(false))
      }
    })
  })
}

function put(url, params) {
  return new Promise(resolve => {
    axios.put(url, params, {
      headers: {
        'x-csrf-token': Cookies.get('csrfToken')
      }
    }).then(rep => {
      resolve(rep)
    }).catch(e => {
      if (e.response.status === 401) {
        store.dispatch(loginAction(false))
      }
    })
  })
}

export function loadState() {
  return new Promise(resolve => {
    get(`${hostUrl}/state`).then(rep => { resolve(rep) })
  })
}

export function saveState(params) {
  return new Promise(resolve => {
    put(`${hostUrl}/state`, params).then(rep => { resolve(rep) })
  })
}

export function login(userName) {
  return new Promise(resolve => {
    post(`${hostUrl}/login`, { userName }).then(rep => { resolve(rep) })
  })
}

export function githubLogin(code) {
  return new Promise(resolve => {
    post(`${hostUrl}/login/github`, { code }).then(rep => { resolve(rep) })
  })
}
