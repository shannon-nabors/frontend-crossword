import React, { Component } from 'react'
import { Grid, Segment, Container, Header, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { isEqual, size, values } from 'lodash'
import { Timer } from 'easytimer.js'

import { setKey,
         selectCell,
         deselectCell,
         selectClue,
         resetAllLetters,
         toggleDirection } from '../redux/actions/puzzleInteraction'
import { toggleInteractionType } from '../redux/actions/createPuzzle.js'
import { solvingPuzzle,
         changeGameStatus,
         handleTimer } from '../redux/actions/solvePuzzle'
import { addFavorite,
         deleteFavorite,
         getFavorites } from '../redux/actions/stats'

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
    this.props.toggleInteractionType("letter")
    this.props.getFavorites("puzzle", this.props.puzzle.id)
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

  componentDidUpdate(prevProps) {
    if(prevProps.clue !== this.props.clue) {
      let c = document.getElementById(`clue-${this.props.clue.id}`)
      c.scrollIntoView(true)
    }
  }

  // Handle timer
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

  // Find all cells in the same word as the specified cell
  findWord(specifiedCell) {
    // find all cells that share
    let word = this.props.puzzle.cells.filter(cell => {
      return cell.clues.find(clue => {
        // the across or down clue associated with the specified cell
        return clue.id === (specifiedCell.clues.find(c => {
          return this.props.direction === "across" ? c.direction === "across" : c.direction === "down"
        })).id
      })
    })

    return word.sort((a, b) => a.id - b.id)
  }

  findNewDirectionWord(ce, dir) {
    let word = this.props.puzzle.cells.filter(cell => cell.clues.find(clue => clue.id === (ce.clues.find(c => dir === "across" ? c.direction === "across" : c.direction === "down")).id))

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

    if (this.props.enteredLetters[nextID]) {
      next = this.findWord(next).find(cell => !this.props.enteredLetters[cell.id])
      if (!next) {
        return sel
      }
    }

    return next
  }

  // Returns the next cell after the current selected cell
  shiftSelectedCellForward() {
    let sel = this.props.selectedCell
    // Sort cells in order of id
    this.props.puzzle.cells.sort((a, b) => a.id - b.id)
    // Out of all the cells in the selected cell's current word
    let word = this.findWord(sel)
    // Find the one that has the next highest id from the selected cell's id
    // As well as no associated entered letter -- i.e., the next blank cell
    let next = word.find(c => c.id > sel.id && !this.props.enteredLetters[c.id])
    // If there are no more blank cells AFTER the selected cell in the current word
    // Find the first blank cell in the word
    if (!next) {
      next = word.find(c => !this.props.enteredLetters[c.id])
    }
    // Then return the cell, or if neither exist, the current selected cell
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
    let entered = this.props.enteredLetters
    let { setKey, selectCell, solvingPuzzle,
          puzzle, user, changeGameStatus } = this.props

    if (event.key === "Backspace") {
      setKey(sel.id, null)
      selectCell(this.shiftSelectedCellBackward(),
                 this.findWord( sel ))

    } else if (event.key === "Tab") {
      event.preventDefault()
      selectCell(this.findNextWordStart(),
                 this.findWord( this.findNextWordStart() ))

    } else if (event.key.length === 1) {
      setKey(sel.id, event.key.toUpperCase())
      selectCell(this.shiftSelectedCellForward(),
                 this.findWord( sel ))
    }

    if (isEqual(this.props.enteredLetters, puzzle.correct_letters)) {
      changeGameStatus("won")
      solvingPuzzle(user.id, puzzle.id, timer.getTotalTimeValues().seconds)
      document.removeEventListener("keydown", this.handleKeyPress)

    } else if (size(this.props.enteredLetters) === size(puzzle.correct_letters) && !values(this.props.enteredLetters).includes(null)) {
      changeGameStatus("completed incorrectly")
    }
  }

  // Select word from clue click
  handleClueClick = (clue) => {
    let sel = this.props.puzzle.cells.find(cell => cell.number === clue.number)
    this.props.selectClue(clue)
    let c = document.getElementById(`clue-${clue.id}`)
    c.scrollIntoView(true)
    // below is a temp. workaround for delay w/toggling dir.
    this.props.selectCell(sel, this.findNewDirectionWord(sel, clue.direction))
  }

  favorited() {
    let { puzzle, userFavorites } = this.props
    return (userFavorites.find(f => f.puzzle_id === puzzle.id)) ? true : false
  }

  handleFavClick = () => {
    if (this.favorited()) {
      this.props.deleteFavorite(this.props.puzzle.id)
    } else {
      this.props.addFavorite(this.props.puzzle.id)
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
              <span>
                <Button
                  icon
                  id="timer-button"
                  color="black"
                  disabled={this.props.gameStatus === "review" ? true : false}
                  onClick={() => this.handleTimerClick()}
                  labelPosition="right"
                ><span id="puz-timer">00:00:00</span><Icon name="pause"/></Button>

                {this.favorited() ? (
                  <Button color="black" id="fav-bar-solve" onClick={this.handleFavClick}><Icon color="red" name="heart"/>{this.props.favorites.length} {this.props.favorites.length === 1 ? "favorite" : "favorites"}</Button>
                ) : (
                  <Button color="black" id="fav-bar-solve" onClick={this.handleFavClick}><Icon color="red" name="heart outline"/>{this.props.favorites.length} {this.props.favorites.length === 1 ? "favorite" : "favorites"}</Button>
                )}

              </span>
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
                <p key={c && c.id}
                   id={`clue-${c.id}`}
                   style={{backgroundColor: this.props.clue && this.props.clue.id === c.id ? "#FFC368" : "#FFFFFF"}}
                   onClick={() => this.handleClueClick(c)}>
                <span className="clue-number">{c.number}</span> {c.content}</p>
              ))}
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <h4>Down</h4>
            <Segment id ="clue-box">
              { puzzle && puzzle.down_clues.sort((a,b) => a.number - b.number ).map(c => (
                <p key={c && c.id}
                   id={`clue-${c.id}`}
                   style={{backgroundColor: this.props.clue && this.props.clue.id === c.id ? "#FFC368" : "#FFFFFF"}}
                   onClick={() => this.handleClueClick(c)}>
                <span className="clue-number">{c.number}</span> {c.content}</p>
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
    paused: state.paused,
    userFavorites: state.userFavorites,
    favorites: state.puzzleFavorites,
    clue: state.selectedClue
  }
}

export default connect(mapStateToProps, { setKey, selectCell, deselectCell, changeGameStatus, resetAllLetters, solvingPuzzle, handleTimer, addFavorite, deleteFavorite, getFavorites, toggleInteractionType, toggleDirection, selectClue })(SolvePage)
