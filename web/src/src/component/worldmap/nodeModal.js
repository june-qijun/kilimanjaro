import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Input } from 'antd'

export class NodeModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.isAdd ? '' : this.props.node.title,
      content: this.props.isAdd ? '' : this.props.node.content,
    }
  }

  ok() {
    if (this.props.isAdd) {
      this.props.onAddNode({
        id: this.props.id,
        node: {
          title: this.state.title,
          content: this.state.content
        }
      })
    } else {
      this.props.onEditNode({
        id: this.props.id,
        node: {
          title: this.state.title,
          content: this.state.content
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
          <Input placeholder='Content' value={this.state.content} onChange={e => this.setState({ content: e.target.value })} />
        </div>
      </Modal>
    )
  }
}

NodeModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  isAdd: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddNode: PropTypes.func.isRequired,
  onEditNode: PropTypes.func.isRequired,
  node: PropTypes.object
}
