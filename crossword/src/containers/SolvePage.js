import React, { Component } from 'react'
import { Grid, Segment, Container, Header, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { isEqual, size, values } from 'lodash'
import { Timer } from 'easytimer.js'

import { setKey,
         selectCell,
         deselectCell,
         resetAllLetters } from '../redux/actions/puzzleInteraction'
import { solvingPuzzle,
         changeGameStatus,
         handleTimer } from '../redux/actions/solvePuzzle'

import Puzzle from './Puzzle'
import ResultsModal from '../components/ResultsModal'
import PauseModal from '../components/PauseModal'

////////
const timer = new Timer()

class SolvePage extends Component {

  // Add/remove event listeners; reset state when leaving page
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
    this.props.changeGameStatus("in progress")

    timer.start()
    timer.addEventListener('secondsUpdated', this.incrementTimer)
  }

  componentWillUnmount() {
    timer.stop()
    document.removeEventListener('secondsUpdated', this.incrementTimer)
    document.removeEventListener("keydown", this.handleKeyPress)
    this.props.changeGameStatus("in progress")
    if (this.props.paused) {
      this.props.handleTimer()
    }
    this.props.resetAllLetters()
    this.props.deselectCell()
  }

  incrementTimer(e) {
    document.querySelector('#puz-timer').innerText = (timer.getTimeValues().toString())
  }

  handleTimerClick = () => {
    this.props.handleTimer()
    if (this.props.paused) {
      timer.start()
    } else {
      timer.pause()
    }
  }

  handleTimerWin() {
    timer.pause()
    return document.querySelector('#puz-timer').innerText
  }

  handleTimerIncorrect() {
    timer.pause()
    return this.handleTimerClick
  }

  // Navigate within across or down word
  findWord(ce) {
    let word = this.props.puzzle.cells.filter(cell => cell.clues.find(clue => clue.id === (ce.clues.find(c => this.props.direction === "across" ? c.direction === "across" : c.direction === "down")).id))

    return word.sort((a, b) => a.id - b.id)
  }



  findNextWordStart() {
    let dir = this.props.direction
    let sel = this.props.selectedCell
    let puz = this.props.puzzle
    let cells = puz.cells.sort((a, b) => a.id - b.id).filter(c => c.shaded === false)

    let clue = (sel.clues.find(c => dir === "across" ? c.direction === "across" : c.direction === "down").id)
    let nextClue = (dir === "across" ? puz.across_clues.find(c => c.id > clue) : puz.down_clues.find(c => c.id > clue))

    if (!nextClue) {
      return sel
    }
    let next = cells.find(cell => cell.clues.find(c => c.id === nextClue.id))
    let nextID = next.id

    while (this.props.enteredLetters[nextID]) {
      next = cells.find(cell => cell.id === nextID + 1)
    }

    return next
  }

  shiftSelectedCellForward() {
    let sel = this.props.selectedCell
    let cells = this.props.puzzle.cells.sort((a, b) => a.id - b.id)
    let next = this.findWord(sel).find(c => c.id > sel.id)
    // console.log("next:", next.id, next.letter, "next word:", this.findNextWordStart().id, this.findNextWordStart().letter)
    // if (!this.props.puzzle.cells.find(c => c.id > sel.id)) {
    //   return sel
    // }

    // let start = this.findWord(sel)[0]
    // while (this.props.enteredLetters[start.id]) {
    //   start = cells.find(cell => cell.id === start.id + 1)
    // }
    // return next ? next : start
    return next ? next : sel
  }

  shiftSelectedCellBackward() {
    let sel = this.props.selectedCell
    let prev = this.findWord(sel).filter(c => c.id < sel.id)
    return this.findWord(sel).find(c => c.id < sel.id) ? prev[prev.length - 1]: sel
  }

  // Enter letters into puzzle
  handleKeyPress = (event) => {
    let sel = this.props.selectedCell
    if (event.key === "Backspace") {
      this.props.setKey(sel.id, null)
      this.props.selectCell(this.shiftSelectedCellBackward(), this.findWord(sel))
    } else if (event.key === "Tab"){
      this.props.selectCell(this.findNextWordStart(), this.findWord(this.findNextWordStart()))
    } else if (event.key.length === 1) {
      this.props.setKey(sel.id, event.key.toUpperCase())
      this.props.selectCell(this.shiftSelectedCellForward(), this.findWord(sel))
    }
    if (isEqual(this.props.enteredLetters, this.props.puzzle.correct_letters)) {
      this.props.changeGameStatus("won")
      this.props.solvingPuzzle(this.props.user.id, this.props.puzzle.id, timer.getTotalTimeValues().seconds)
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
        <Grid columns={4}>
          <Grid.Column width={8}>

            <Container id="puz-sizer">
              <Header as="h2" id="puz-title">{puzzle && puzzle.title}</Header>
              <Header as="h4" id="puz-author">by {puzzle && `${puzzle.constructor.first_name} ${puzzle.constructor.last_name}`}</Header>
              <Button
                icon
                id="timer-button"
                color="black"
                disabled={this.props.gameStatus === "review" ? true : false}
                onClick={() => this.handleTimerClick()}
                labelPosition="right"
              ><span id="puz-timer">00:00:00</span><Icon name="pause"/></Button>
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
                <p key={c && c.id}><span className="clue-number">{c.number}</span> {c.content}</p>
              ))}
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <h4>Down</h4>
            <Segment id ="clue-box">
              { puzzle && puzzle.down_clues.sort((a,b) => a.number - b.number ).map(c => (
                <p key={c && c.id}><span className="clue-number">{c.number}</span> {c.content}</p>
              ))}
            </Segment>
          </Grid.Column>
        </Grid>

        {(this.props.gameStatus === "won" || this.props.gameStatus === "completed incorrectly") && (
          <ResultsModal
            puzzle={ puzzle }
            time={this.props.gameStatus === "won" ? this.handleTimerWin() : this.handleTimerIncorrect()}
          />
        )}

        {(this.props.paused && this.props.gameStatus === "in progress") ? (
          <PauseModal exit={() => this.handleTimerClick()}/>
        ) : null}
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
    user: state.currentUser,
    paused: state.paused
  }
}

export default connect(mapStateToProps, { setKey, selectCell, deselectCell, changeGameStatus, resetAllLetters, solvingPuzzle, handleTimer })(SolvePage)
