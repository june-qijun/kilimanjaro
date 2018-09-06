import { connect } from 'react-redux'
import { NodeModal } from '../component/worldmap/nodeModal'
import { addNode, editNode } from '../reducers/worldmap'

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddNode: (data) => {
      dispatch(addNode(data))
    },
    onEditNode: (data) => {
      dispatch(editNode(data))
    }
  }
}

export const WorldNodeModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeModal)
