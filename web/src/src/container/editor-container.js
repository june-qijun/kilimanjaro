import { connect } from 'react-redux'
import { NoteEditor } from '../component/editor/editor'
import { changeContent } from '../reducers/notes'
import { saveState } from '../rootReducer'

const mapStateToProps = state => {
  return {
    content: state.activeNote ? state.notes.byId[state.activeNote].content : '',
    isDisabled: state.activeNote ? false : true
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onContentChange: content => dispatch(changeContent({ content })),
    onCtrlS: () => dispatch(saveState())
  }
}

export const UrlNoteEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteEditor)