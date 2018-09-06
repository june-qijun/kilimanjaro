import { connect } from 'react-redux'
import { SideBar } from '../component/sidebar/sidebar'
import { deleteNote, moveNote } from '../reducers/notes'
import { chooseNote } from '../rootReducer'

const mapStateToProps = state => {
  const notes = []
  for (const id of state.notes.allIds) {
    const note = state.notes.byId[id]
    if (note.belong.indexOf(state.activeWorldNode) !== -1) {
      notes.push({
        id,
        ...state.notes.byId[id]
      })
    }
  }
  return {
    items: notes,
    showedItemFiled: 'title',
    activeItem: state.activeNote
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteItemClick: (id) => {
      dispatch(deleteNote(id))
    },
    onItemClick: note => {
      dispatch(chooseNote({ id: note.id }))
    },
    onItemIconClick: note => {
      window.open(note.url, '_blank')
    },
    onMoveItem: data => {
      dispatch(moveNote(data))
    }
  }
}

export const NoteSideBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar)
