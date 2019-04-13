import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchingGuestPuzzles } from '../redux/actions/changePuzzles'
import PuzzleContainer from './PuzzleContainer'

class SolveMenu extends Component {

  componentDidMount() {
    if (this.props.puzzles.length === 0) {
      this.props.fetchingGuestPuzzles()
    }
  }

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

export default connect(mapStateToProps, { fetchingGuestPuzzles })(SolveMenu)
