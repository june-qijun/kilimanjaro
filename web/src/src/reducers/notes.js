import uuidv4 from 'uuid/v4'
import { createActions, handleActions } from 'redux-actions'
import * as _ from 'lodash'

const defaultState = {}

export const { addNote, deleteNote, editNote, changeContent, moveNote } = createActions({
  ADD_NOTE: (node) => ({ node }),
  DELETE_NOTE: (id) => ({ id }),
  EDIT_NOTE: ({ id, note }) => ({ id, note }),
  CHANGE_CONTENT: ({ content }) => ({ content }),
  MOVE_NOTE: ({ srcId, tarId }) => ({ srcId, tarId })
})

export const notesReducer = handleActions(
  {
    [addNote]: (state, { payload: { node } }) => {
      const newState = _.cloneDeep(state.notes)
      const newId = uuidv4()
      node = {
        ...node,
        content: '',
        belong: [state.activeWorldNode]
      }
      newState.byId[newId] = node
      newState.allIds.push(newId)
      return Object.assign({}, state, { notes: newState })
    },
    [deleteNote]: (state, { payload: { id } }) => {
      const newState = _.cloneDeep(state.notes)
      delete newState.byId[id]
      newState.allIds.splice(newState.allIds.indexOf(id), 1)
      let activeNote = ''
      if (newState.allIds.length > 0) {
        activeNote = newState.allIds[0]
      }
      return Object.assign({}, state, { notes: newState }, { activeNote })
    },
    [editNote]: (state, { payload: { id, note } }) => {
      const newState = _.cloneDeep(state.notes)
      newState.byId[id] = Object.assign(newState.byId[id], note)
      return Object.assign({}, state, { notes: newState })
    },
    [changeContent]: (state, { payload: { content } }) => {
      if (!state.activeNote) {
        return state
      }
      const newState = _.cloneDeep(state.notes)
      newState.byId[state.activeNote].content = content
      return Object.assign({}, state, { notes: newState })
    },
    [moveNote]: (state, { payload: { srcId, tarId } }) => {
      const newState = _.cloneDeep(state.notes)
      newState.allIds.splice(newState.allIds.indexOf(srcId), 1)
      newState.allIds.splice(newState.allIds.indexOf(tarId) + 1, 0, srcId)
      return Object.assign({}, state, { notes: newState })
    }
  },
  defaultState
)
