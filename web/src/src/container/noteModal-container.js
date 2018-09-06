import { connect } from 'react-redux'
import { NoteModal } from '../component/sidebar/noteModal'
import { addNote, editNote } from '../reducers/notes'

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddNote: (data) => {
      dispatch(addNote(data))
    },
    onEditNote: (data) => {
      dispatch(editNote(data))
    }
  }
}

export const WorldNoteModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteModal)
