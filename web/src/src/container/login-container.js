import { connect } from 'react-redux'
import { Login } from '../component/login/login'
import { githubLogin } from '../service/login'

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGitHubLogin: () => {
      githubLogin()
    }
  }
}

export const UserLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
