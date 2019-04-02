import React, { Component } from 'react'

class Cell extends Component {
  render() {
    return (
      <g>
        <rect x="3.00" y="3.00" width="23.00" height="23.00" fill="none"></rect>
        <text
          x={(23*this.props.cell.column) - 18}
          y={(23*this.props.cell.row) - 11.83}
          textAnchor="start"
          fontSize="7.67"
        >{this.props.cell.number}</text>
        <text
          x={(23*this.props.cell.column) - 8.5}
          y={(23*this.props.cell.row) + 1.08}
          textAnchor="middle"
          fontSize="15.33"
        >{this.props.cell.letter}</text>
      </g>
    )
  }
}

export default Cell
