import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCell, toggleDirection } from '../redux/actions'

class Cell extends Component {

  setFillColor() {
    let cell = this.props.cell
    let sel = this.props.selected

    if (cell.shaded) {
      return "black"
    } else if (cell === sel) {
      return "#FFA414"
    } else if (sel && this.props.highlighted.includes(cell.id)){
      return "#FFC368"
    } else {
      return "white"
    }
  }

  handleClick() {
    let cell = this.props.cell
    if (cell.shaded) {
      return
    } else if (cell === this.props.selected) {
      this.props.toggleDirection()
    } else {
      this.props.selectCell(cell)
    }
  }

  setLetter() {
    if (this.props.answers) {
      return this.props.cell.letter
    }
    if (this.props.pressedKey && this.props.cell === this.props.selected) {
      return this.props.pressedKey.toUpperCase()
    }
  }

  render() {
    let cell = this.props.cell

    return (
      <g
        onClick={this.props.editable && (() => this.handleClick())}>
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
        >{ this.setLetter() }</text>
      </g>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selected: state.selectedCell,
    highlighted: state.highlightedCells,
    pressedKey: state.pressedKey
  }
}

export default connect(mapStateToProps, { selectCell, toggleDirection })(Cell)
