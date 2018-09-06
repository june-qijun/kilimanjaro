import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Switch } from 'antd';
import { WorldNoteModal } from '../../container/noteModal-container'
import './sidebar.css'

export class SideBar extends Component {
  constructor() {
    super()
    this.state = {
      isEditMode: false,
      noteModal: {
        isShow: false,
        isAdd: true
      },
      dragOverId: null
    }
  }

  onAddItemClick(e) {
    this.setState({
      noteModal: {
        isShow: true,
        isAdd: true,
        note: null
      }
    })
    e.stopPropagation()
  }

  onDeleteItemClick(e, item) {
    this.props.onDeleteItemClick(item.id)
    e.stopPropagation()
  }

  onEditItemClick(e, item) {
    this.setState({
      noteModal: {
        isShow: true,
        isAdd: false,
        note: item
      }
    })
    e.stopPropagation()
  }

  closeNoteModal() {
    this.setState({
      noteModal: {
        isShow: false,
        isAdd: true
      }
    })
  }

  dragstart(e) {
    e.dataTransfer.setData('text/plain', e.target.id)
    e.dataTransfer.effectAllowed = "move"
  }

  dragover(e) {
    this.setState({
      dragOverId: e.target.id
    })
    e.preventDefault()
  }

  drop(e) {
    this.setState({
      dragOverId: null
    })
    const srcId = e.dataTransfer.getData('text/plain')
    const tarId = e.target.id
    this.props.onMoveItem({
      srcId,
      tarId
    })
    e.preventDefault()
  }

  render() {
    return (
      <div className='side-wrapper'>
        <div className='side-container'>
          <div className='flex-right' style={{ padding: '10px' }}>
            <span>编辑：</span>
            <Switch checked={this.state.isEditMode} size="small" onChange={checked => this.setState({ isEditMode: checked })} />
          </div>
          {
            this.props.items.map((item, i) => {
              const className = 'side-item' +
                (item.id === this.props.activeItem ? ' active-item' : '') +
                (item.id === this.state.dragOverId ? ' side-item-drag' : '')
              return (<div id={item.id} key={item.id} className={className}
                onClick={e => this.props.onItemClick(item)}
                draggable={this.state.isEditMode}
                onDragOver={e => this.dragover(e)}
                onDragStart={e => this.dragstart(e)}
                onDrop={e => this.drop(e)}>
                <span>{item[this.props.showedItemFiled]}</span>
                {
                  this.state.isEditMode ?
                    (<span>
                      <Button style={{ 'marginRight': '10px' }} shape='circle' icon='delete' onClick={e => this.onDeleteItemClick(e, item)} />
                      <Button shape='circle' icon='edit' onClick={e => this.onEditItemClick(e, item)} />
                    </span>) :
                    <Button type='primary' shape='circle' icon='link' onClick={e => this.props.onItemIconClick(item)} />
                }
              </div>)
            }
            )
          }
        </div>
        <div className='add-button'>
          <Button type='primary' size='large' shape='circle' icon='plus' onClick={e => { this.onAddItemClick(e) }} />
        </div>
        {
          this.state.noteModal.isShow ?
            <WorldNoteModal
              isShow={this.state.noteModal.isShow}
              isAdd={this.state.noteModal.isAdd}
              note={this.state.noteModal.note}
              onClose={() => { this.closeNoteModal() }}
            /> : null
        }
      </div>
    )
  }
}

SideBar.propTypes = {
  onDeleteItemClick: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onItemIconClick: PropTypes.func.isRequired,
  onMoveItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  showedItemFiled: PropTypes.string.isRequired,
  activeItem: PropTypes.string.isRequired
}
