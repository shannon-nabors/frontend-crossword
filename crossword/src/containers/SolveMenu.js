import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PuzzleContainer from './PuzzleContainer'

class SolveMenu extends Component {

  render() {
    return(
      <Fragment>
        <PuzzleContainer
          puzzles={ this.props.puzzles }
        />

      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    puzzles: state.unsolvedPuzzles
  }
}

export default connect(mapStateToProps)(SolveMenu)
