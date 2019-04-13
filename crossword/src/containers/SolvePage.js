import React, { Component } from 'react'
import { Grid, Segment, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { isEqual, size, values } from 'lodash'

import { setKey,
         selectCell,
         deselectCell,
         resetAllLetters } from '../redux/actions/puzzleInteraction'
import { solvingPuzzle,
         changeGameStatus } from '../redux/actions/solvePuzzle'

import Puzzle from './Puzzle'
import ResultsModal from '../components/ResultsModal'

////////

class SolvePage extends Component {

  // Add/remove event listeners; reset state when leaving page
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
    this.props.changeGameStatus("in progress")
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
    this.props.changeGameStatus("in progress")
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
      this.props.changeGameStatus("won")
      this.props.solvingPuzzle(this.props.user.id, this.props.puzzle.id)
      document.removeEventListener("keydown", this.handleKeyPress)
    } else if (size(this.props.enteredLetters) === size(this.props.puzzle.correct_letters) && !values(this.props.enteredLetters).includes(null)) {
      this.props.changeGameStatus("completed incorrectly")
    }
  }

  ///////

  render() {
    let { puzzle } = this.props
    return (
      <Container>
        <Grid columns={4} divided>
          <Grid.Column width={8}>
            <Container id="puz-sizer">
              <h2>{puzzle && puzzle.title}</h2>
              <h4>by {puzzle && puzzle.constructor.name}</h4>
              <Puzzle
                key={puzzle && puzzle.id}
                puzzle={puzzle}
                editable={this.props.gameStatus === "in progress" ? "true" : null}
                answers={this.props.gameStatus === "review" ? "true" : null}
              />
            </Container>
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

        {(this.props.gameStatus === "won" || this.props.gameStatus === "completed incorrectly") && (
          <ResultsModal
            puzzle={ puzzle }
          />
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    puzzle: [...state.unsolvedPuzzles, ...state.solvedPuzzles].find(p => p.id === parseInt(ownProps.match.params.puzzleID)),
    selectedCell: state.selectedCell,
    highlightedCells: state.highlightedCells,
    direction: state.direction,
    enteredLetters: state.enteredLetters,
    gameStatus: state.gameStatus,
    user: state.currentUser
  }
}

export default connect(mapStateToProps, { setKey, selectCell, deselectCell, changeGameStatus, resetAllLetters, solvingPuzzle })(SolvePage)
