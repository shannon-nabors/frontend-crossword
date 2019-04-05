import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Puzzle from './Puzzle'
import ResultsModal from '../components/ResultsModal'
import { settingKey, selectCell, toggleGameStatus } from '../redux/actions'
import { size, isEqual } from 'lodash'

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
    if (isEqual(this.props.enteredLetters, this.props.puzzle.correct_letters)) {
      this.props.toggleGameStatus()
      document.removeEventListener("keydown", this.handleKeyPress)
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
        {this.props.gameStatus === "won" && (
          <ResultsModal />
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    puzzle: state.puzzles.find(p => p.id === parseInt(ownProps.match.params.puzzleID)),
    selectedCell: state.selectedCell,
    highlightedCells: state.highlightedCells,
    direction: state.direction,
    enteredLetters: state.enteredLetters,
    gameStatus: state.gameStatus
  }
}

export default connect(mapStateToProps, { settingKey, selectCell, toggleGameStatus })(SolvePage)
