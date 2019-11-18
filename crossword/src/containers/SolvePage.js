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

    let cells = this.props.puzzle.cells.sort((a, b) => a.id - b.id).filter(c => c.shaded === false)
    this.props.selectCell(cells[0], this.findWord(cells[0]))
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
      c.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  /////////////////////////////   HANDLE TIMER    ////////////////////////////

  // Count up by seconds 
  incrementTimer(e) {
    document.querySelector('#puz-timer').innerText = (timer.getTimeValues().toString())
  }

  // Pause and restart timer
  handleTimerClick = () => {
    this.props.handleTimer()
    if (this.props.paused) {
      timer.start()
    } else {
      timer.pause()
    }
  }

  // Stop timer on win and return the time used
  handleTimerWin() {
    timer.pause()
    return document.querySelector('#puz-timer').innerText
  }

  // Pause timer on incorrect solve, to be restarted when clicking out of modal
  handleTimerIncorrect() {
    timer.pause()
    return this.handleTimerClick
  }

  /////////////////////////////   NAVIGATE PUZZLE    ////////////////////////////

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
    // return them in order of id
    return word.sort((a, b) => a.id - b.id)
  }

  findNewDirectionWord(ce, dir) {
    let word = this.props.puzzle.cells.filter(cell => cell.clues.find(clue => clue.id === (ce.clues.find(c => dir === "across" ? c.direction === "across" : c.direction === "down")).id))

    return word.sort((a, b) => a.id - b.id)
  }

  findNextClue(clueId) {
    // Set clue array based on current direction
    // The next clue should be the clue with the next highest id from the given clue
    return this.clues(this.props.direction).find(clue => clue.id > clueId)
  }

  firstClue() {
    return this.clues(this.props.direction)[0]
  }

  clues(direction) {
    let { puzzle } = this.props
    return (direction === "across" ? puzzle.across_clues : puzzle.down_clues)
  }

  findNextCellWithClue(cells, clueId) {
    return cells.find(cell => cell.clues.find(clue => clue.id === clueId))
  }

  findNextWordStart(clueId) {
    let dir = this.props.direction
    let sel = this.props.selectedCell
    let puz = this.props.puzzle
    // Sort unshaded cells by id
    let cells = puz.cells.sort((a, b) => a.id - b.id).filter(c => c.shaded === false)
    // Find the next across or down clue
    let nextClue = this.findNextClue(clueId)
    // If there is no next clue (i.e. it's the last clue)
    if (!nextClue) {
      // Switch directions and go to first clue in that direction
      this.props.toggleDirection(this.findWord(sel))
      // first clue id - 1 is to prevent it from skipping first clue (since it's returning the next)
      return this.findNextWordStart(this.firstClue().id-1)
    }
    // The next cell should be the next cell (by id) that has nextClue as a clue
    // let next = cells.find(cell => cell.clues.find(c => c.id === nextClue.id))
    let next = this.findNextCellWithClue(cells, nextClue.id)
    let nextID = next.id
    // If that cell is filled
    if (this.props.enteredLetters[nextID]) {
      // the next cell should be the next cell in that word that isn't filled
      next = this.findWord(next).find(cell => !this.props.enteredLetters[cell.id])
      // If they're all filled
      if (!next) {
        // Move on to the next clue after that
        return this.findNextWordStart(nextClue.id)
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
    if (!next) { next = word.find(c => !this.props.enteredLetters[c.id]) }
    // If all the cells in the word are filled, the next cell in the word should be selected
    if (!next) { next = word.find(c => c.id > sel.id) }
    // If the selected cell is the last cell in the word, it should remain selected
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
    if (!sel) { return }
    let entered = this.props.enteredLetters
    let { setKey, selectCell, solvingPuzzle,
          puzzle, user, changeGameStatus, direction } = this.props

    // CASE: Backspace
    if (event.key === "Backspace") {
      // If there's a letter in the current cell,
      if (entered[sel.id]){
        // hitting backspace should just delete that letter.
        setKey(sel.id, null)
      } else {
        // Otherwise, find the cell before this one,
        let back = this.shiftSelectedCellBackward()
        // move back to that cell,
        selectCell(back, this.findWord( sel ))
        // and delete that cell's entered letter
        setKey(back.id, null)
      }
    // CASE: Tab
    } else if (event.key === "Tab") {
      // Prevent tabbing from cycling focus throughout page (i.e. selecting address bar)
      event.preventDefault()
      // Find the cell that starts the next word
      let currentClueId = (sel.clues.find(c => {
        return direction === "across" ? c.direction === "across" : c.direction === "down"
      }).id)
      let nextWord = this.findNextWordStart(currentClueId)
      // and select that cell
      selectCell(nextWord, this.findWord( nextWord ))
    // CASE: Letters
    } else if (event.key.length === 1) {
      // Add the pressed letter to "enteredLetters" in state,
      // with a key of the selected cell's id
      setKey(sel.id, event.key.toUpperCase())
      // Move forward to the next cell
      selectCell(this.shiftSelectedCellForward(), this.findWord( sel ))
    }

    // If the entered letter completes the puzzle
    if (isEqual(this.props.enteredLetters, puzzle.correct_letters)) {
      changeGameStatus("won")
      // save their time
      solvingPuzzle(user.id, puzzle.id, timer.getTotalTimeValues().seconds)
      // stop listening for keypresses
      document.removeEventListener("keydown", this.handleKeyPress)

    } else if (size(this.props.enteredLetters) === size(puzzle.correct_letters) && !values(this.props.enteredLetters).includes(null)) {
      changeGameStatus("completed incorrectly")
    }
  }

  // Select word from clue click
  handleClueClick = (clue) => {
    let sel = this.props.puzzle.cells.find(cell => cell.number === clue.number)
    this.props.selectClue(clue)
    // let c = document.getElementById(`clue-${clue.id}`)
    // c.scrollIntoView(true)
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
