import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchingGuestPuzzles } from '../redux/actions/changePuzzles'
import PuzzleContainer from './PuzzleContainer'

class SolveMenu extends Component {

  componentDidMount() {
    if (!this.props.user.name) {
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
    puzzles: state.unsolvedPuzzles,
    user: state.currentUser
  }
}

export default connect(mapStateToProps, { fetchingGuestPuzzles })(SolveMenu)
