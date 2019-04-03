import React, { Component } from 'react'
import Cell from '../components/Cell'

class Puzzle extends Component {

  makePathData(num) {
    let pathData = ""
    for (let n = num; n > 1; n--) {
      pathData = pathData.concat(" ", ` M 3 ${23*n-20} l ${23*num + 3} 0 M ${23*n-20} 3 l 0 ${23*num + 3}`)
    }
    return pathData
  }

  render() {
    return (
      <svg viewBox="0 0 75 75" preserveAspectRatio="xMidYMin meet" xmlns="http://www.w3.org/2000/svg">
        <g>
          {this.props.puzzle.cells.map(c =>
            <Cell
              key={c.id}
              cell={c}
              size={this.props.puzzle.cells.length}
            />
          )}
        </g>
        <g>
          <path
            d={this.makePathData(Math.sqrt(this.props.puzzle.cells.length))}
            stroke="dimgray">
          </path>
          <rect
            x="1.50"
            y="1.50"
            width="72.00"
            height="72.00"
            stroke="black"
            strokeWidth="3.00"
            fill="none">
          </rect>
        </g>
      </svg>
    )
  }
}

export default Puzzle
