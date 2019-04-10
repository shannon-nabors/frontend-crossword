import React, { Component } from 'react'
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

export default PuzzleContainer
