import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Select } from 'antd';
const Option = Select.Option;

export class NodeMoveModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      to: ''
    }
  }

  ok() {
    this.props.onMove({
      from: this.props.id,
      to: this.state.to
    })
    this.props.onClose()
  }

  cancel() {
    this.props.onClose()
  }

  render() {
    return (
      <Modal
        title='Move'
        visible={this.props.isShow}
        onOk={e => this.ok()}
        onCancel={e => this.cancel()}
      >
        <Select defaultValue={this.state.to} onChange={id => { this.setState({ to: id }) }} style={{ width: '100%' }}>
          {
            this.props.nodes.map(node => (
              <Option value={node.id} key={node.id}>{node.title}</Option>
            ))
          }
        </Select>
      </Modal >
    )
  }
}

NodeMoveModal.propTypes = {
  id: PropTypes.string.isRequired,
  isShow: PropTypes.bool.isRequired,
  nodes: PropTypes.array.isRequired,
  onMove: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}
