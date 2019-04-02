import React, { Component } from 'react'
import { connect } from 'react-redux'
import PuzzleCard from './PuzzleCard'

class PuzzleContainer extends Component {
  render() {
    return (
      <div className="ui cards">
        {this.props.puzzles.map(p => <PuzzleCard key={p.id} puzzle={p} />)}
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
