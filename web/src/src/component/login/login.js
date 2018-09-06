import React, { Component } from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import './login.css'

export class Login extends Component {
  render() {
    return (
      <div className='login-background'>
        <div className='login-container'>
          {
            <Button type="primary" onClick={e => this.props.onGitHubLogin()}>Github Login</Button>
          }
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  onGitHubLogin: PropTypes.func.isRequired
}
