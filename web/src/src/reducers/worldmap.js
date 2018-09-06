import uuidv4 from 'uuid/v4'
import { createActions, handleActions } from 'redux-actions'
import * as _ from 'lodash'
import { deepFirst } from '../util'

function findParent(id, root, nodes) {
  let pId
  deepFirst(root, nodes, (nodeId, node) => {
    if (node.children.indexOf(id) !== -1) {
      pId = nodeId
    }
  })
  return pId
}

const defaultState = {}

export const { addNode, editNode, deleteNode, moveNode } = createActions({
  ADD_NODE: ({ id, node }) => ({ id, node }),
  EDIT_NODE: ({ id, node }) => ({ id, node }),
  DELETE_NODE: ({ id }) => ({ id }),
  MOVE_NODE: ({ from, to }) => ({ from, to })
})

export const worldmapReducer = handleActions(
  {
    [addNode]: (state, { payload: { id, node } }) => {
      const newState = _.cloneDeep(state.worldTree)
      const newId = uuidv4()
      node = {
        ...node,
        children: []
      }
      newState.byId[newId] = node
      newState.byId[id].children.push(newId)
      return newState
    },
    [editNode]: (state, { payload: { id, node } }) => {
      const newState = _.cloneDeep(state.worldTree)
      Object.assign(newState.byId[id], { ...node })
      return newState
    },
    [deleteNode]: (state, { payload: { id } }) => {
      const newState = _.cloneDeep(state.worldTree)
      deepFirst(newState.root, newState.byId, (nodeId, node) => {
        const index = node.children.indexOf(id)
        if (index !== -1) {
          node.children.splice(index, 1)
        }
      })
      delete newState.byId[id]
      return newState
    },
    [moveNode]: (state, { payload: { from, to } }) => {
      const newState = _.cloneDeep(state.worldTree)
      const pId = findParent(from, newState.root, newState.byId)
      const pNode = newState.byId[pId]
      pNode.children.splice(pNode.children.indexOf(from), 1)
      newState.byId[to].children.push(from)
      return newState
    }
  },
  defaultState
)
