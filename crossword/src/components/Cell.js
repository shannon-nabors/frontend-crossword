import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCell as select } from '../redux/actions'

class Cell extends Component {

  setFillColor() {
    if (this.props.cell.shaded) {
      return "black"
    } else if (this.props.cell.id === this.props.selected) {
      return "#E8320D" //E86245
    } else {
      return "white"
    }
  }

  render() {
    let cell = this.props.cell

    return (
      <g
        onClick={() => {
          !cell.shaded && this.props.select(cell.id)
        }}>
        <rect
          x={ (23 * cell.column - 20).toString() }
          y={ (23 * cell.row - 20).toString() }
          width="23.00"
          height="23.00"
          fill={ this.setFillColor() }>
        </rect>

        <text
          x={ (23 * cell.column) - 18 }
          y={ (23 * cell.row) - 11.83 }
          textAnchor="start"
          fontSize="7.67"
        >{ cell.number }</text>

        <text
          x={ (23 * cell.column) - 8.5 }
          y={ (23 * cell.row) + 1.08 }
          textAnchor="middle"
          fontSize="15.33"
        >{ this.props.answers && cell.letter }</text>
      </g>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selected: state.selectedCell
  }
}

export default connect(mapStateToProps, { select })(Cell)
