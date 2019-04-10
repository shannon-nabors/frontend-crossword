import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PuzzleContainer from './PuzzleContainer'

class CurrentUserPage extends Component {
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
    puzzles: state.userPuzzles
  }
}

export default connect(mapStateToProps)(CurrentUserPage)
