import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import { orderedById, unshadedCells,
    firstCell, firstAcrossWord } from '../helpers/puzzleHelpers'


class TypingFunctions extends Component {

    componentDidMount() {
        // set state
        this.props.changeGameStatus("in progress")
        this.props.toggleInteractionType("letter")

        // event listeners
        document.addEventListener("keydown", this.handleKeyPress)
        // select first cell
        let {selectCell, selectedCell, puzzle} = this.props
        if (puzzle.cells && !selectedCell) {
            if (firstCell(puzzle).clues.length > 0) {
                selectCell(firstCell(puzzle), firstAcrossWord(puzzle))
            }
        }
    }

    componentWillUnmount() {
        // set state
        // Taking this out for now so toggling to search won't deselect
        // this.props.deselectCell()

        // remove event listeners
        document.removeEventListener("keydown", this.handleKeyPress)
    }



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
        clue: state.selectedClue,
        interaction: state.interactionType
    }
  }

export default connect(mapStateToProps, { enterLetter,
                                          selectCell,
                                          deselectCell,
                                          changeGameStatus,
                                          resetAllLetters,
                                          solvingPuzzle,
                                          handleTimer,
                                          addFavorite,
                                          deleteFavorite,
                                          getFavorites,
                                          toggleInteractionType,
                                          toggleDirection,
                                          selectClue })(TypingFunctions)