import React, { Component, Fragment } from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'

import { setKey,
         selectCell,
         deselectCell,
         resetAllLetters,
         toggleGameStatus } from '../redux/actions/puzzleInteraction'
import { solvingPuzzle } from '../redux/actions/solvePuzzle'

import Puzzle from './Puzzle'
import ResultsModal from '../components/ResultsModal'
import DeleteButton from '../components/DeletePuzzleButton'

////////

class SolvePage extends Component {

  // Add/remove event listeners; reset state when leaving page
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
    this.props.resetAllLetters()
    this.props.deselectCell()
  }

  // Navigate within across or down word
  findWord() {
    let word = this.props.puzzle.cells.filter(cell => cell.clues.find(clue => clue.id === (this.props.selectedCell.clues.find(c => this.props.direction === "across" ? c.direction === "across" : c.direction === "down")).id) )

    return word.sort((a, b) => a.id - b.id)
  }

  shiftSelectedCellForward() {
    let sel = this.props.selectedCell
    let next = this.findWord().find(c => c.id > sel.id)
    return next ? next : sel
  }

  shiftSelectedCellBackward() {
    let sel = this.props.selectedCell
    let prev = this.findWord().filter(c => c.id < sel.id)
    return this.findWord().find(c => c.id < sel.id) ? prev[prev.length - 1]: sel
  }

  // Enter letters into puzzle
  handleKeyPress = (event) => {
    if (event.key === "Backspace") {
      this.props.setKey(this.props.selectedCell.id, null)
      this.props.selectCell(this.shiftSelectedCellBackward(), this.findWord())
    } else if (event.key.length === 1) {
      this.props.setKey(this.props.selectedCell.id, event.key.toUpperCase())
      this.props.selectCell(this.shiftSelectedCellForward(), this.findWord())
    }
    if (isEqual(this.props.enteredLetters, this.props.puzzle.correct_letters)) {
      this.props.toggleGameStatus()
      this.props.solvingPuzzle(1, this.props.puzzle.id)
      document.removeEventListener("keydown", this.handleKeyPress)
    }
  }

  ///////

  render() {
    let { puzzle } = this.props
    return (
      <Fragment>
        <Grid columns={3} divided>
          <Grid.Column>
            <div className="ui container" id="puz-sizer">
              <h2>{puzzle && puzzle.title}</h2>
              <h4>by {puzzle && puzzle.constructor.name}</h4>
              <DeleteButton puzzle={puzzle}/>
              <Puzzle
                key={puzzle && puzzle.id}
                puzzle={puzzle}
                editable="true"
              />
            </div>
          </Grid.Column>

          <Grid.Column>
            <h4>Across</h4>
            <Segment id ="clue-box">
              { puzzle && puzzle.across_clues.sort((a,b) => a.number - b.number ).map(c => (
                <p key={c && c.id}>{c.number}. {c.content}</p>
              ))}
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <h4>Down</h4>
            <Segment id ="clue-box">
              { puzzle && puzzle.down_clues.sort((a,b) => a.number - b.number ).map(c => (
                <p key={c && c.id}>{c.number}. {c.content}</p>
              ))}
            </Segment>
          </Grid.Column>
        </Grid>

        {this.props.gameStatus === "won" && (
          <ResultsModal
            puzzle={ puzzle }
          />
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    puzzle: state.unsolvedPuzzles.find(p => p.id === parseInt(ownProps.match.params.puzzleID)),
    selectedCell: state.selectedCell,
    highlightedCells: state.highlightedCells,
    direction: state.direction,
    enteredLetters: state.enteredLetters,
    gameStatus: state.gameStatus
  }
}

export default connect(mapStateToProps, { setKey, selectCell, deselectCell, toggleGameStatus, resetAllLetters, solvingPuzzle })(SolvePage)
