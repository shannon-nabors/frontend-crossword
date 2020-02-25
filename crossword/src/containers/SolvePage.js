import React, { Component } from 'react'
import { Grid, Segment, Container, Header, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { isEqual, size, values } from 'lodash'
import { Link } from 'react-router-dom'
import { Timer } from 'easytimer.js'

import { enterLetter,
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
import { findWord } from '../helpers/typingHelpers'

import Puzzle from './Puzzle'
import ResultsModal from '../components/ResultsModal'
import PauseModal from '../components/PauseModal'



/////////////////////////////   SETUP    ////////////////////////////

const timer = new Timer()

class SolvePage extends Component {

  componentDidMount() {
    // set state
    this.props.getFavorites("puzzle", this.props.puzzle.id)
    this.props.changeGameStatus("in progress")
    
    // timer
    timer.start()

    // event listeners
    timer.addEventListener('secondsUpdated', this.incrementTimer)
  }


  componentWillUnmount() {
    // timer
    timer.stop()

    // set state
    this.props.changeGameStatus("in progress")
    this.props.resetAllLetters()

    // unpause in state if needed
    if (this.props.paused) {
      this.props.handleTimer()
    }

    // remove event listeners
    document.removeEventListener('secondsUpdated', this.incrementTimer)
  }


  componentDidUpdate(prevProps) {
    // scroll to clue if active clue changed in state
    if(prevProps.clue !== this.props.clue) {
      let clueElement = document.getElementById(`clue-${this.props.clue.id}`)
      clueElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }



  /////////////////////////////   HANDLE TIMER    ////////////////////////////

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



  /////////////////////////////   WINNING    ////////////////////////////

  gameIsWon() {
    return isEqual(this.props.enteredLetters, this.props.puzzle.correct_letters)
  }

  puzzleIsFilled() {
    let { enteredLetters, puzzle } = this.props
    return size(enteredLetters) === size(puzzle.correct_letters) && !values(enteredLetters).includes(null)
  }

  checkForWin = () => {
    let { changeGameStatus, solvingPuzzle, user, puzzle } = this.props

    if (this.gameIsWon()) {
      changeGameStatus("won")
      solvingPuzzle(user.id, puzzle.id, timer.getTotalTimeValues().seconds)
      document.removeEventListener("keydown", this.handleKeyPress)
    } else if (this.puzzleIsFilled()) {
      changeGameStatus("completed incorrectly")
    }

  }



  /////////////////////////////   CLUE CLICKING    ////////////////////////////

  handleClueClick = (clue) => {
    let cluesFirstCell = this.props.puzzle.cells.find(cell => cell.number === clue.number)
    this.props.selectClue(clue)
    this.props.selectCell(cluesFirstCell, findWord(cluesFirstCell, this.props.puzzle.cells, clue.direction))
  }



  /////////////////////////////   FAVORITING    ////////////////////////////

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



  /////////////////////////////   RENDER    ////////////////////////////

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
              <Button
                floated="right" 
                icon color="black"
                as={ Link }
                to={`/puzzles/${this.props.puzzle.id}/printdata`}
                >
                <Icon name="print"></Icon>
              </Button>
              <Puzzle
                key={puzzle && puzzle.id}
                puzzle={puzzle}
                editable={this.props.gameStatus === "in progress" ? "true" : null}
                answers={this.props.gameStatus === "review" ? "true" : null}
                solvable={true}
                checkForWin={this.checkForWin}
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

export default connect(mapStateToProps, { enterLetter, selectCell, deselectCell, changeGameStatus, resetAllLetters, solvingPuzzle, handleTimer, addFavorite, deleteFavorite, getFavorites, toggleInteractionType, toggleDirection, selectClue })(SolvePage)
