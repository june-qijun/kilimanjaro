import { connect } from 'react-redux'
import React, { Component } from 'react'
import queryString from 'query-string'
import { githubLogin } from '../service/core'

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

class _LoginCallback extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'Logining...'
        }
    }

    componentDidMount() {
        const query = queryString.parse(window.location.search)
        const code = query.code
        githubLogin(code).then(rep => {
            console.log(rep)
            if (rep.data.status === 'ok') {
                this.setState({
                    status: 'Login success.'
                })
                window.location.href = '/'
            } else {
                this.setState({
                    status: 'Login faild.'
                })
                setTimeout(() => {
                    window.location.href = '/login'
                }, 3000)
            }
        })
    }

    render() {
        return (<div>{this.state.status}</div>)
    }
}

export const LoginCallback = connect(mapStateToProps, mapDispatchToProps)(_LoginCallback)