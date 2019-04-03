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

    let cells = this.props.puzzle && this.props.puzzle.cells
    let dim = cells && Math.sqrt(cells.length)

    return (
      <svg
        viewBox={`0 0 ${23*dim+6} ${23*dim+6}`}
        preserveAspectRatio="xMidYMin meet"
        xmlns="http://www.w3.org/2000/svg"
        >
        <g>
          {cells && cells.map(c =>
            <Cell
              key={c.id}
              cell={c}
              editable={this.props.editable}
              answers={this.props.answers}
            />
          )}
        </g>
        <g>
          <path
            d={this.makePathData(dim)}
            stroke="dimgray">
          </path>
          <rect
            x="1.50"
            y="1.50"
            width={ (23 * dim + 3).toString() }
            height={ (23 * dim + 3).toString() }
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
