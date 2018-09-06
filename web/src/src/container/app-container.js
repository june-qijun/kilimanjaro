import React, { Component } from 'react'
import { App } from '../component/app/app'
import { connect } from 'react-redux'
import { loadState, saveState, openWorld } from '../rootReducer'
import { message } from 'antd'
import Mousetrap from 'mousetrap'
import { loadState as loadStateFromServer } from '../service/core'

class AppContainer extends Component {
  componentDidMount() {
    this.setUpShortCut()
    this.loadState()
  }

  saveState() {
    this.props.saveState()
    console.log('Saved.')
    message.success('Saved.', 1)
  }

  loadState() {
    loadStateFromServer().then(rep => {
      this.props.loadState({ loadedState: JSON.parse(rep.data.data) })
    })
    // const state = window.localStorage.getItem('state')
    // if (state) {
    //   this.props.loadState({ loadedState: JSON.parse(state) })
    // }
  }

  setUpShortCut() {
    Mousetrap.bind('ctrl+s', () => {
      this.saveState()
      return false
    })
  }

  render() {
    return (
      <App
        isLogin={this.props.isLogin}
        worldTitle={this.props.worldTitle}
        noteTitle={this.props.noteTitle}
        isShowWorld={this.props.isShowWorld}
        onSaveClick={() => this.saveState()}
        onLoadClick={() => this.loadState()}
        onWorldClick={() => this.props.showWorld()} />
    )
  }
}

const mapStateToProps = state => {
  return {
    state,
    worldTitle: state.activeWorldNode ? state.worldTree.byId[state.activeWorldNode].title : '',
    noteTitle: state.activeNote ? state.notes.byId[state.activeNote].title : '',
    isShowWorld: state.isShowWorld,
    isLogin: state.isLogin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showWorld: () => dispatch(openWorld()),
    loadState: (state) => dispatch(loadState(state)),
    saveState: () => dispatch(saveState())
  }
}

export const AppWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)