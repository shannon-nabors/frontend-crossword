import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Puzzle from './Puzzle'
import { settingKey, selectCell } from '../redux/actions'

class SolvePage extends Component {

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
  }

  findWord() {
    return this.props.puzzle.cells.filter(c => this.props.direction === "across" ?  this.props.selectedCell.fellow_across.includes(c.id) : this.props.selectedCell.fellow_down.includes(c.id))
  }

  shiftSelectedCellForward() {
    return this.findWord().find(c => c.id > this.props.selectedCell.id) ? this.findWord().find(c => c.id > this.props.selectedCell.id) : this.props.selectedCell
  }

  shiftSelectedCellBackward() {
    let previousLetters = this.findWord().filter(c => c.id < this.props.selectedCell.id)
    return this.findWord().find(c => c.id < this.props.selectedCell.id) ? previousLetters[previousLetters.length - 1]: this.props.selectedCell
  }

  handleKeyPress = (event) => {
    if (event.key === "Backspace") {
      this.props.settingKey(this.props.selectedCell.id, null)
      this.props.selectCell(this.shiftSelectedCellBackward())
    } else if (event.key.length === 1) {
      this.props.settingKey(this.props.selectedCell.id, event.key.toUpperCase())
      this.props.selectCell(this.shiftSelectedCellForward())
    }
  }

  render() {
    return (
      <Fragment>
        <h2>{this.props.puzzle && this.props.puzzle.title}</h2>
        <div className="ui container" id="puz-sizer">
          <Puzzle
            puzzle={this.props.puzzle}
            editable="true"
          />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    puzzle: state.puzzles.find(p => p.id === parseInt(ownProps.match.params.puzzleID)),
    selectedCell: state.selectedCell,
    highlightedCells: state.highlightedCells,
    direction: state.direction
  }
}

export default connect(mapStateToProps, { settingKey, selectCell })(SolvePage)
