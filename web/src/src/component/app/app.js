import React, { Component } from 'react'
import { NoteSideBar } from '../../container/sidebar-container'
import { UrlNoteEditor } from '../../container/editor-container'
import { JuneWorldMap } from '../../container/worldmap-container'
import PropTypes from 'prop-types'
import { UploadModal } from './uploadModal'
import { Button } from 'antd'
import './app.less'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      uploadModal: {
        isShow: false
      }
    }
  }

  showUpload(isShow) {
    this.setState({
      uploadModal: {
        isShow
      }
    })
  }

  render() {
    return (
      <div className='app-container'>
        <div className='app-topbar' onClick={e => this.props.onWorldClick()}>
          <span className='app-worldtitle'>
            {
              this.props.worldTitle
            }
          </span>
          <div className='app-operation'>
            <Button type='primary' icon='upload'
              onClick={e => { this.showUpload(true); e.stopPropagation(); }} />
            <Button style={{ marginLeft: '15px' }} type='primary' icon='save' onClick={e => { this.props.onSaveClick(); e.stopPropagation(); }} />
            <Button style={{ marginLeft: '15px' }} type='primary' icon='cloud-download'
              onClick={e => { this.props.onLoadClick(); e.stopPropagation(); }} />
          </div>
        </div>
        <div className='app-content'>
          <div className='app-editor'>
            <div className='app-sidebar'>
              <NoteSideBar />
            </div>
            <div className='app-viewer'>
              <h1 className='app-viewer-title'>{this.props.noteTitle}</h1>
              <div  className='app-viewer-content'>
                <UrlNoteEditor />
              </div>
            </div>
          </div>
          <div className='app-worldmap' style={{ height: this.props.isShowWorld ? '100%' : '0px' }}>
            {this.props.isShowWorld && <JuneWorldMap />}
          </div>
        </div>
        <UploadModal isShow={this.state.uploadModal.isShow} onClose={e => this.showUpload(false)} />
      </div>
    )
  }
}

App.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  worldTitle: PropTypes.string.isRequired,
  noteTitle: PropTypes.string.isRequired,
  isShowWorld: PropTypes.bool.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onLoadClick: PropTypes.func.isRequired,
  onWorldClick: PropTypes.func.isRequired
}
