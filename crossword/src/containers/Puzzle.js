import React, { Component } from 'react'
import Cell from '../components/Cell'

class Puzzle extends Component {
  render() {
    return (
      <svg viewBox="0 0 75 75" preserveAspectRatio="xMidYMin meet" xmlns="http://www.w3.org/2000/svg">
        <g>
          {this.props.puzzle && this.props.puzzle.cells.map(c => <Cell key={c.id} cell={c} size={this.props.puzzle.cells.length}/>)}
        </g>
        <g>
          <path d="M 3 26 l 72 0 M 3 49 l 72 0 M 26 3 l 0 72 M 49 3 l 0 72" stroke="dimgray"></path>
          <rect x="1.50" y="1.50" width="72.00" height="72.00" stroke="black" strokeWidth="3.00" fill="none"></rect>
        </g>
      </svg>
    )
  }
}

export default Puzzle
