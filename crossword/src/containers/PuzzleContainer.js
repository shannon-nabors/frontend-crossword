import React, { Component } from 'react'
import { connect } from 'react-redux'
import Puzzle from './Puzzle'

class PuzzleContainer extends Component {
  render() {
    return (
      <div>
        {this.props.puzzles.map(p => <Puzzle />)}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    puzzles: state.puzzles
  }
}

export default connect(mapStateToProps)(PuzzleContainer)
