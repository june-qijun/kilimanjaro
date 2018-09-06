import React, { Component } from 'react'
import { ReactSVGPanZoom } from 'react-svg-pan-zoom'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import { Node } from './node/node'
import { WorldNodeModal } from '../../container/nodeModal-container'
import { WorldNodeMoveModal } from '../../container/nodeMoveModal-container'
import { setIntervalTimes, widthFirst, sortChildrenByDepth } from '../../util'
import * as _ from 'lodash'
import './worldmap.css'

export class WorldMap extends Component {
  constructor(props) {
    super(props)
    const lastZoom = localStorage.getItem('svgZoom')
    this.state = {
      conHeight: 0,
      conWidth: 0,
      svgZoom: lastZoom ? JSON.parse(lastZoom) : null,
      nodeModal: {
        isShow: false
      },
      nodeMoveModal: {
        isShow: false
      }
    }
  }

  addNode(id) {
    this.setState({
      nodeModal: {
        id,
        isShow: true,
        isAdd: true
      }
    })
  }

  editNode(id, node) {
    this.setState({
      nodeModal: {
        id,
        isShow: true,
        isAdd: false,
        node
      }
    })
  }

  deleteNode(id) {
    Modal.confirm({
      title: '提示',
      content: '确认删除？',
      onOk: () => {
        this.props.onDeleteNode({ id })
      }
    })
  }

  moveNode(id) {
    this.setState({
      nodeMoveModal: {
        id,
        isShow: true
      }
    })
  }

  onCloseNodeMoveModal() {
    this.setState({
      nodeMoveModal: {
        isShow: false
      }
    })
  }

  onCloseNodeModal() {
    this.setState({
      nodeModal: {
        isShow: false
      }
    })
  }

  getNodes() {
    const nodes = []
    this.treeNodes = _.cloneDeep(this.props.nodes)
    sortChildrenByDepth(this.props.rootNode, this.treeNodes)
    widthFirst(this.props.rootNode, this.treeNodes, ({ id, node, index, level }) => {
      const x = 400 * level, y = 200 * index
      nodes.push(
        <Node
          node={node}
          x={x}
          y={y}
          key={id}
          onAdd={() => this.addNode(id)}
          onEdit={() => this.editNode(id, node)}
          onDelete={() => this.deleteNode(id)}
          onMove={() => this.moveNode(id)}
          onNodeClick={() => this.props.chooseWorldNode({ id })} />
      )
      node.x = x
      node.y = y
    })
    return nodes
  }

  getLines() {
    const lines = []
    widthFirst(this.props.rootNode, this.treeNodes, ({ id, node, index, level }) => {
      const x1 = node.x + 310, y1 = node.y + 35
      if (node.children) {
        for (const cId of node.children) {
          const cnode = this.treeNodes[cId]
          const x2 = cnode.x, y2 = cnode.y + 35
          lines.push(
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fff" key={cId} />
          )
        }
      }
    })
    return lines
  }

  componentDidMount() {
    setIntervalTimes(() => {
      if (this.container) {
        this.setState({
          conHeight: this.container.clientHeight,
          conWidth: this.container.clientWidth
        })
      }
    }, 100, 20)
  }

  componentWillUnmount() {
    localStorage.setItem('svgZoom', JSON.stringify(this.state.svgZoom))
  }

  onSvgZoomChangeValue(v) {
    this.setState({
      svgZoom: v
    })
  }

  render() {
    return (
      <div className='worldmap-container' ref={(el) => { this.container = el }}>
        <ReactSVGPanZoom
          value={this.state.svgZoom}
          onChangeValue={(v) => { this.onSvgZoomChangeValue(v) }}
          tool='auto'
          background='#000'
          width={this.state.conWidth}
          height={this.state.conHeight}
          detectAutoPan={false}
          toolbarPosition='none'
          miniaturePosition='none'>
          <svg>
            {this.getNodes()}
            {this.getLines()}
          </svg>
        </ReactSVGPanZoom>
        {
          this.state.nodeModal.isShow ?
            <WorldNodeModal
              id={this.state.nodeModal.id}
              isShow={this.state.nodeModal.isShow}
              isAdd={this.state.nodeModal.isAdd}
              node={this.state.nodeModal.node}
              onClose={() => { this.onCloseNodeModal() }}
            /> : null
        }
        {
          this.state.nodeMoveModal.isShow ?
            <WorldNodeMoveModal
              id={this.state.nodeMoveModal.id}
              isShow={this.state.nodeMoveModal.isShow}
              onClose={() => { this.onCloseNodeMoveModal() }}
            /> : null
        }
      </div>
    )
  }
}

WorldMap.propTypes = {
  nodes: PropTypes.object.isRequired,
  rootNode: PropTypes.string.isRequired,
  onDeleteNode: PropTypes.func.isRequired,
  chooseWorldNode: PropTypes.func.isRequired
}
