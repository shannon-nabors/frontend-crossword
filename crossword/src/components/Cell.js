import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectCell,
         toggleDirection } from '../redux/actions/puzzleInteraction'
import { toggleShade,
         toggleCircle } from '../redux/actions/createPuzzle'

class Cell extends Component {

  setFillColor() {
    let cell = this.props.cell
    let sel = this.props.selected

    if (cell.shaded) {
      return "#1b1c1d"
    } else if (cell === sel) {
      return "#FFA414"
    } else if (sel && this.props.highlighted.find(c => c.id === cell.id)){
      return "#FFC368"
    } else {
      return "white"
    }
  }

  handleClick() {
    let cell = this.props.cell
    if (this.props.editable || this.props.interaction === "letter") {
      if (cell.shaded) {
        return
      } else if (cell === this.props.selected) {
        this.props.direction === "across" ? this.props.toggleDirection(this.fellow_down()) : this.props.toggleDirection(this.fellow_across())
      } else {
        this.props.direction === "across" ? this.props.selectCell(cell, this.fellow_across()) : this.props.selectCell(cell, this.fellow_down())
      }
    } else if (this.props.shadeable) {
      this.props.toggleShade(cell.id)
    } else if (this.props.circleable && !cell.shaded) {
      this.props.toggleCircle(cell.id)
    }
  }

  fellow_across() {
    return this.props.puzzle.cells.filter(cell => cell.clues.find(clue => clue.id === (this.props.cell.clues.find(c => c.direction === "across")).id) && cell !== this.props.cell)
  }

  fellow_down() {
    return this.props.puzzle.cells.filter(cell => cell.clues.find(clue => clue.id === (this.props.cell.clues.find(c => c.direction === "down")).id) && cell !== this.props.cell)
  }

  render() {
    let cell = this.props.cell

    return (
      <g
        onClick={() => this.handleClick()}>
        <rect
          x={ (23 * cell.column - 20).toString() }
          y={ (23 * cell.row - 20).toString() }
          width="23.00"
          height="23.00"
          fill={ this.setFillColor() }>
        </rect>

        {cell.circled ? 
          <circle
            cx={ (23 * cell.column - 9).toString() }
            cy={ (23 * cell.row - 9).toString() }
            r={"10.75"}
            stroke="dimgray"
            fill="none"
            vectorEffect="non-scaling-stroke"
          ></circle>
         : null}

        <text
          x={ (23 * cell.column) - 18 }
          y={ (23 * cell.row) - 11.83 }
          textAnchor="start"
          fontSize="7.67"
          fill="#1b1c1d"
        >{ cell.number }</text>

        <text
          x={ (23 * cell.column) - 8.5 }
          y={ (23 * cell.row) + 1.08 }
          textAnchor="middle"
          fontSize="15.33"
          fill="#1b1c1d"
        >{ this.props.answers ? cell.letter : this.props.enteredLetters[cell.id] }</text>
      </g>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selected: state.selectedCell,
    highlighted: state.highlightedCells,
    enteredLetters: state.enteredLetters,
    direction: state.direction,
    interaction: state.interactionType
  }
}

export default connect(mapStateToProps, { selectCell, toggleDirection, toggleShade, toggleCircle })(Cell)
