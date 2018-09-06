import React, { Component } from 'react'
import { Divider, Button, Dropdown, Menu } from 'antd'
import PropTypes from 'prop-types'
import './node.css'

export class Node extends Component {
  constructor() {
    super()
    this.state = {
      height: 0,
      width: 0
    }
  }

  componentDidMount() {
    this.setState({
      height: this.ref.clientHeight,
      width: this.ref.clientWidth
    })
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <span onClick={(e) => { this.props.onAdd(this.props.node); e.stopPropagation() }}>Add</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={(e) => { this.props.onEdit(this.props.node); e.stopPropagation() }}>Edit</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={(e) => { this.props.onDelete(this.props.node); e.stopPropagation() }}>Delete</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={(e) => { this.props.onMove(this.props.node); e.stopPropagation() }}>Move</span>
        </Menu.Item>
      </Menu>
    )

    return (
      <foreignObject x={this.props.x} y={this.props.y} height={this.state.height} width={this.state.width}>
        <div className='node-container' ref={(el) => { this.ref = el }} xmlns="http://www.w3.org/1999/xhtml">
          <div className='node-card' onClick={() => { this.props.onNodeClick() }}>
            <div className='node-title'>
              <span>
                {this.props.node.title}
              </span>
              <span onClick={(e) => { e.stopPropagation() }}>
                <Dropdown overlay={menu} placement="bottomLeft">
                  <Button style={{ 'float': 'right' }} type='primary' shape='circle' icon='ellipsis' size='small' />
                </Dropdown>
              </span>
            </div>
            <Divider style={{ margin: 0 }} />
            {
              this.props.node.content ?
                <div className='node-content'>
                  {this.props.node.content}
                </div> : null
            }
          </div>
        </div>
      </foreignObject>
    )
  }
}

Node.propTypes = {
  node: PropTypes.object.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onNodeClick: PropTypes.func.isRequired
}
