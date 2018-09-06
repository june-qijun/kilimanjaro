import { WorldMap } from '../component/worldmap/worldmap'
import { connect } from 'react-redux'
import { chooseWorldNode } from '../rootReducer'
import { deleteNode } from '../reducers/worldmap'

const mapStateToProps = state => {
  return {
    nodes: state.worldTree.byId,
    rootNode: state.worldTree.root
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteNode: data => {
      dispatch(deleteNode(data))
    },
    chooseWorldNode: data => {
      dispatch(chooseWorldNode(data))
    }
  }
}

export const JuneWorldMap = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorldMap)
