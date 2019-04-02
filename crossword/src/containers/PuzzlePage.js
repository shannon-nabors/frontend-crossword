import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Puzzle from './Puzzle'

class PuzzlePage extends Component {
  render() {
    return (
      <Fragment>
        <h2>{this.props.puzzle && this.props.puzzle.title}</h2>
        <Puzzle puzzle={this.props.puzzle}/>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    puzzle: state.puzzles.find(p => p.id === parseInt(ownProps.match.params.puzzleID))
  }
}

export default connect(mapStateToProps)(PuzzlePage)
