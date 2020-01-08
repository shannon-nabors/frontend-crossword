import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isEqual, size, values } from 'lodash'
// import { Timer } from 'easytimer.js'
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
import { shiftBackward,
    currentCellHasLetter,
    shiftForward,
    firstClue,
    findNextClue,
    findNextCellWithClue,
    cellClueForCurrentDirection,
    cellIsFilled,
    opposite,
    clues,
    findNextBlankCell,
    findWord } from '../helpers/typingHelpers'

// const timer = new Timer()

class TypingFunctions extends Component {

    componentDidMount() {
        // if (this.props.timerOn) {
            // set state
            this.props.changeGameStatus("in progress")
            this.props.toggleInteractionType("letter")
            
            // timer
            // timer.start()
        
            // event listeners
            // timer.addEventListener('secondsUpdated', this.incrementTimer)
            document.addEventListener("keydown", this.handleKeyPress)
        
            // select first cell
            let cells = this.props.puzzle.cells.sort((a, b) => a.id - b.id).filter(c => c.shaded === false)
            if (cells[0].clues.length > 0) {
                this.props.selectCell(cells[0], findWord(cells[0], cells, "across"))
            }
        // }
    }

    componentWillUnmount() {
        // if (this.props.timerOn) {
            // timer
            // timer.stop()
            
            // set state
            this.props.changeGameStatus("in progress")
            this.props.resetAllLetters()
            this.props.deselectCell()
        
            // unpause in state if needed
            // if (this.props.paused) {
            // this.props.handleTimer()
            // }
        
            // remove event listeners
            // document.removeEventListener('secondsUpdated', this.incrementTimer)
            document.removeEventListener("keydown", this.handleKeyPress)
        // }
    }

    // incrementTimer(e) {
    //     document.querySelector('#puz-timer').innerText = (timer.getTimeValues().toString())
    // }
    
    // handleTimerClick = () => {
    //     this.props.handleTimer()
    //     if (this.props.paused) {
    //         timer.start()
    //     } else {
    //         timer.pause()
    //     }
    // }
    
    // handleTimerWin() {
    //     timer.pause()
    //     return document.querySelector('#puz-timer').innerText
    // }
    
    // handleTimerIncorrect() {
    //     timer.pause()
    //     return this.handleTimerClick
    // }

    handleKeyPress = (event) => {
        if (!this.props.selectedCell) { return }
    
        if (event.key === "Backspace") {
          this.handleBackspace()
        } else if (event.key === "Tab") {
          event.preventDefault()
          this.handleTabbing()
        } else if (event.key.length === 1) {
          this.handleLetterPress(event)
        }
    
        if (this.props.solvable) {this.props.checkForWin()}
    }
    
    handleBackspace() {
        let { puzzle, direction, selectedCell, enteredLetters } = this.props

        if (currentCellHasLetter(selectedCell, enteredLetters)) {
            this.deleteLetter(selectedCell)
        } else {
            let word = findWord(selectedCell, puzzle.cells, direction)
            let previousCell = shiftBackward(selectedCell, word)

            this.props.selectCell(previousCell, word)
            this.deleteLetter(previousCell)
        }
    }

    handleTabbing() {
        let { selectedCell, puzzle, selectCell } = this.props
        let currentClueId = cellClueForCurrentDirection(selectedCell, this.props.direction).id
        let nextWordStart = this.findNextWordStart(currentClueId)
        let nextWord = findWord(nextWordStart, puzzle.cells, this.props.direction)
    
        selectCell(nextWordStart, nextWord)
    }
    
    handleLetterPress(event) {
        let { enterLetter, selectCell, selectedCell,
              puzzle, direction, enteredLetters } = this.props

        enterLetter(selectedCell.id, event.key.toUpperCase())
    
        let nextCell = shiftForward(selectedCell, puzzle.cells, enteredLetters, direction)
        let word = findWord(selectedCell, puzzle.cells, direction)
        selectCell(nextCell, word)
    }

    findNextClue(clueId) {
        return clues(this.props.direction, this.props.puzzle).find(clue => clue.id > clueId)
    }
    
    firstClue() {
        return clues(this.props.direction, this.props.puzzle)[0]
    }
    
    findNextWordStart(clueId) {
        let { direction, puzzle } = this.props
        let nextClue = findNextClue(clueId, puzzle, direction)
     
        if (!nextClue) {
            return this.startOverOppositeDirection()
        } else {
            return this.nextBlankCellByDirection(nextClue.id)
        }
    }

    findFirstWordStart(direction) {
        let clue = firstClue(direction, this.props.puzzle)
        return this.findNextWordStart(clue.id)
    }
      
    startOverOppositeDirection() {
        let { selectedCell, puzzle, direction } = this.props
        let newDirection = opposite(direction)
        let word = findWord(selectedCell, puzzle.cells, opposite(direction))
        this.props.toggleDirection(word)
        return this.findFirstWordStart(newDirection)
    }

    nextBlankCellByDirection(clueId) {
        let { puzzle, enteredLetters, direction } = this.props
        let nextCellCandidate = findNextCellWithClue(puzzle.cells, clueId)
    
        if (cellIsFilled(nextCellCandidate, enteredLetters)) {
          let nextWord = findWord(nextCellCandidate, puzzle.cells, direction)
          nextCellCandidate = findNextBlankCell(nextWord, nextCellCandidate, enteredLetters)
          if (!nextCellCandidate) { return this.findNextWordStart(clueId) }
        }
    
        return nextCellCandidate
    }
    
    deleteLetter(cell) {
        this.props.enterLetter(cell.id, null)
    }

    // gameIsWon() {
    //     return isEqual(this.props.enteredLetters, this.props.puzzle.correct_letters)
    // }
    
    // puzzleIsFilled() {
    //     let { enteredLetters, puzzle } = this.props
    //     return size(enteredLetters) === size(puzzle.correct_letters) && !values(enteredLetters).includes(null)
    // }
    
    // checkForWin() {
    //     let { changeGameStatus, solvingPuzzle, user, puzzle } = this.props
    
    //     if (this.gameIsWon()) {
    //         changeGameStatus("won")
    //         solvingPuzzle(user.id, puzzle.id, timer.getTotalTimeValues().seconds)
    //         document.removeEventListener("keydown", this.handleKeyPress)
    //     } else if (this.puzzleIsFilled()) {
    //         changeGameStatus("completed incorrectly")
    //     }
    
    // }

    render() {
        return (<></>)
    }

}

const mapStateToProps = (state) => {
    return {
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

export default connect(mapStateToProps, { enterLetter, selectCell, deselectCell, changeGameStatus, resetAllLetters, solvingPuzzle, handleTimer, addFavorite, deleteFavorite, getFavorites, toggleInteractionType, toggleDirection, selectClue })(TypingFunctions)