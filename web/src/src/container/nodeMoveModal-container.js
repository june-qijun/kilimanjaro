import { connect } from 'react-redux'
import { NodeMoveModal } from '../component/worldmap/nodeMoveModal'
import { moveNode } from '../reducers/worldmap'

const mapStateToProps = state => {
  const nodes = []
  for (const id of Object.keys(state.worldTree.byId)) {
    nodes.push({
      id,
      ...state.worldTree.byId[id]
    })
  }
  return {
    nodes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMove: (data) => {
      dispatch(moveNode(data))
    }
  }
}

export const WorldNodeMoveModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeMoveModal)
