import React, { Component } from 'react'

class Cell extends Component {
  render() {
    return (
      <g>
        <rect x="3.00" y="3.00" width="23.00" height="23.00" fill="none"></rect>
        <text x="5.00" y="11.17" text-anchor="start" font-size="7.67">1</text>
        <text x="14.50" y="24.08" text-anchor="middle" font-size="15.33">H</text>
      </g>
    )
  }
}

export default Cell
