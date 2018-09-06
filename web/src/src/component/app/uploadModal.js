import React, { Component } from 'react'
import { Modal, Input } from 'antd'
import { saveState } from '../../service/core'

export class UploadModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stateInput: ''
    }
  }

  ok() {
    saveState('founder-june', JSON.parse(this.state.stateInput)).then(rep => {
      this.props.onClose()
    })
  }

  cancel() {
    this.props.onClose()
  }

  render() {
    return (
      <Modal
        title='Upload'
        visible={this.props.isShow}
        onOk={e => this.ok()}
        onCancel={e => this.cancel()}
      >
        <Input.TextArea rows={10} value={this.state.stateInput} onChange={e => this.setState({ stateInput: e.target.value })} />
      </Modal >
    )
  }
}