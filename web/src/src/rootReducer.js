import { notesReducer, addNote, deleteNote, editNote, changeContent, moveNote } from './reducers/notes'
import { worldmapReducer, addNode, editNode, deleteNode } from './reducers/worldmap'
import { createActions, handleActions, combineActions } from 'redux-actions'
import { saveState as saveStateFromServer } from './service/core'

const defaultState = {}

export const { saveState, loadState, chooseNote, openWorld, chooseWorldNode, login } = createActions({
  SAVE_STATE: () => { },
  LOAD_STATE: ({ loadedState }) => ({ loadedState }),
  CHOOSE_NOTE: ({ id }) => ({ id }),
  OPEN_WORLD: () => { },
  CHOOSE_WORLD_NODE: ({ id }) => ({ id }),
  LOGIN: ({ isLogin }) => ({ isLogin })
})

export const rootReducer = handleActions({
  [saveState]: (state) => {
    localStorage.setItem('state', JSON.stringify(state))
    saveStateFromServer('founder-june', state)
    return state
  },
  [loadState]: (state, { payload: { loadedState } }) => {
    return loadedState
  },
  [chooseNote]: (state, { payload: { id } }) => (Object.assign({}, state, { activeNote: id })),
  [openWorld]: (state) => (Object.assign({}, state, { isShowWorld: !state.isShowWorld })),
  [chooseWorldNode]: (state, { payload: { id } }) => {
    let activeNote = ''
    for (const noteId of state.notes.allIds) {
      if (state.notes.byId[noteId].belong.indexOf(id) !== -1) {
        activeNote = noteId
        break
      }
    }
    return Object.assign({}, state, { activeWorldNode: id, isShowWorld: false, activeNote })
  },
  [login]: (state, { payload: { isLogin } }) => {
    if (!isLogin) {
      window.location.href = '/login'
    } else {
      window.location.href = '/'
    }
    return Object.assign({}, state, { isLogin })
  },
  [combineActions(addNote, deleteNote, editNote, changeContent, moveNote)]: (state, action) => (notesReducer(state, action)),
  [combineActions(addNode, editNode, deleteNode)]: (state, action) => (Object.assign({}, state, { worldTree: worldmapReducer(state, action) }))
}, defaultState)
