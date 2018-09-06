import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Input } from 'antd'

export class NoteModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.isAdd ? '' : this.props.note.title,
      url: this.props.isAdd ? '' : this.props.note.url,
    }
  }

  ok() {
    if (this.props.isAdd) {
      this.props.onAddNote({
        title: this.state.title,
        url: this.state.url
      })
    } else {
      this.props.onEditNote({
        id: this.props.note.id,
        note: {
          title: this.state.title,
          url: this.state.url
        }
      })
    }
    this.props.onClose()
  }

  cancel() {
    this.props.onClose()
  }

  render() {
    return (
      <Modal
        title={this.props.isAdd ? 'Add' : 'Edit'}
        visible={this.props.isShow}
        onOk={e => this.ok()}
        onCancel={e => this.cancel()}
      >
        <div>
          <Input placeholder='Title' value={this.state.title} onChange={e => this.setState({ title: e.target.value })} />
        </div>
        <div style={{ paddingTop: '20px' }}>
          <Input placeholder='Url' value={this.state.url} onChange={e => this.setState({ url: e.target.value })} />
        </div>
      </Modal>
    )
  }
}

NoteModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  isAdd: PropTypes.bool.isRequired,
  onAddNote: PropTypes.func.isRequired,
  onEditNote: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  note: PropTypes.object
}
