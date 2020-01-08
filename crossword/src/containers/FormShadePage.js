import React, { Component, Fragment } from 'react'
import { Container, Dimmer, Loader,
         Header, Segment, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updatingPuzzle,
         setLetters,
         toggleInteractionType,
         updateAcrossClue,
         updateDownClue,
         updateTitle,
         setFormStage,
         clearNewPuzzle } from '../redux/actions/createPuzzle.js'
import { selectCell,
         deselectCell,
         enterLetter,
         resetAllLetters } from '../redux/actions/puzzleInteraction.js'
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
import { savedPuzzle } from '../redux/actions/changePuzzles.js'
import Next from '../components/FormNextButton'
import Puzzle from './Puzzle'

class ShadePage extends Component {

  /////////////////////////////   SETUP    ////////////////////////////

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
    this.props.toggleInteractionType("shade")
    this.props.deselectCell()
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
    this.props.deselectCell()
    this.props.resetAllLetters()
  }

  componentDidUpdate(prevProps) {
    if(this.props.interaction === "letter" && prevProps.loading === true) {
      let cells = this.props.puzzle.cells.sort((a, b) => a.id - b.id).filter(c => c.shaded === false)
      if (cells[0].clues.length > 0) {
        this.props.selectCell(cells[0], findWord(cells[0], cells, "across"))
      }
    }
  }

  handleInteractionChange(buttonType) {
    // Set interaction type in state, depending on which button was clicked
    this.props.toggleInteractionType(buttonType)
    if (buttonType === "letter" && this.props.interaction !== "letter") {
      this.props.updatingPuzzle("setup")
    } else if (buttonType === "shade" && this.props.interaction !== "shade") {
      this.props.deselectCell()
      this.props.setLetters()
      this.props.updatingPuzzle("letter")
    }
  }

  handleSave = () => {
    this.props.setLetters()
    this.props.updatingPuzzle("letter")
    this.props.deselectCell()
    // this.props.savedPuzzle(this.props.puzzle)
  }

  isEditable() {
    return (this.props.interaction === "letter")
  }

  isShadeable() {
    return (this.props.interaction === "shade")
  }


  /////////////////////////////   KEY PRESSING    ////////////////////////////

  // findWord(ce) {
  //   let word = this.props.puzzle.cells.filter(cell => cell.clues.find(clue => clue.id === (ce.clues.find(c => this.props.direction === "across" ? c.direction === "across" : c.direction === "down")).id) )

  //   return word.sort((a, b) => a.id - b.id)
  // }

  // shiftSelectedCellForward() {
  //   let { selectedCell, puzzle, direction } = this.props
  //   // let cells = this.props.puzzle.cells.sort((a, b) => a.id - b.id)
  //   let next = findWord(selectedCell, puzzle.cells, direction).find(c => c.id > selectedCell.id)
  //   return next ? next : selectedCell
  //   // return this.findWord().find(c => c.id > this.props.selectedCell.id) ? this.findWord().find(c => c.id > this.props.selectedCell.id) : this.props.selectedCell
  // }

  // shiftSelectedCellBackward() {
  //   let sel = this.props.selectedCell
  //   let previousLetters = this.findWord(sel).filter(c => c.id < this.props.selectedCell.id)
  //   return this.findWord(sel).find(c => c.id < this.props.selectedCell.id) ? previousLetters[previousLetters.length - 1]: this.props.selectedCell
  // }

  // handleKeyPress = (event) => {
  //   let sel = this.props.selectedCell
  //   if (this.props.selectedCell && document.activeElement.type !== "text") {
  //     if (event.key === "Backspace") {
  //       this.props.enterLetter(this.props.selectedCell.id, null)
  //       this.props.selectCell(this.shiftSelectedCellBackward(), this.findWord(sel))
  //     } else if (event.key === "Tab"){
  //       this.props.selectCell(this.findNextWordStart(), this.findWord(this.findNextWordStart()))
  //     } else if (event.key.length === 1) {
  //       this.props.enterLetter(this.props.selectedCell.id, event.key.toUpperCase())
  //       this.props.selectCell(this.shiftSelectedCellForward(), this.findWord(sel))
  //     }
  //   }
  // }

  // findNextWordStart() {
  //   //Set variables
  //   let dir = this.props.direction
  //   let sel = this.props.selectedCell
  //   let puz = this.props.puzzle

  //   //Get all cells, in order, only the unshaded ones
  //   let cells = puz.cells.sort((a, b) => a.id - b.id).filter(c => c.shaded === false)

  //   // Set the clue (if current direction is across,
  //   // it's the selected cell's across clue, and vice versa)
  //   let clue = (sel.clues.find(c => dir === "across" ? c.direction === "across" : c.direction === "down").id)
    
  //   // Using the puzzle's "across clues" and "down clues" arrays,
  //   // Find the clue with the next greatest id from this one
  //   let nextClue = (dir === "across" ? puz.across_clues.find(c => c.id > clue) : puz.down_clues.find(c => c.id > clue))

  //   // If there's no next clue (if we're at the bottom of the puzzle)
  //   // Just stay on the same cell
  //   if (!nextClue) {
  //     return sel
  //   }

  //   // If there is a next clue,
  //   // Find the first cell that has it as one of its clues
  //   let next = cells.find(cell => cell.clues.find(c => c.id === nextClue.id))
  //   let nextID = next.id

  //   if (this.props.enteredLetters[nextID]) {
  //     // next = cells.find(cell => cell.id === nextID + 1)
  //     next = this.findWord(next).find(cell => !this.props.enteredLetters[cell.id])
  //     if (!next) {
  //       return sel
  //     }
  //   }

  //   return next
  // }

  handleKeyPress = (event) => {
    if (!this.props.selectedCell || document.activeElement.type === "text") { return }

    if (event.key === "Backspace") {
      this.handleBackspace()
    } else if (event.key === "Tab") {
      event.preventDefault()
      this.handleTabbing()
    } else if (event.key.length === 1) {
      this.handleLetterPress(event)
    }

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
    return(
      <Fragment>
        <Container id="shade-header">
          <Segment clearing id="form-heading" attached="top">
            <Header as="h2" id="enter-header" floated="left">
              Step 2: Shade squares and enter letters
            </Header>
            <Header floated="right">
              <Button 
                id="save-button" 
                icon color="black"
                onClick={ this.handleSave }>
                <Icon name="save"></Icon>
              </Button>
            </Header>
          </Segment>
          <Segment attached>
            When shading, click any square to toggle the color.  When entering letters, type and backspace as you would normally.  You can tab to the next clue, and click the active square to toggle the direction you're typing.
          </Segment>
        </Container>
        <Container textAlign="center" id="form-toggler">
          <Button.Group color="black">
            <Button
              active={this.props.interaction === "shade"}
              onClick={() => this.handleInteractionChange("shade")}
            >Shade</Button>
            <Button
              active={this.props.interaction === "letter"}
              onClick={ () => this.handleInteractionChange("letter")}
            >Letter</Button>
          </Button.Group>
        </Container>
        <Container id="shade-sizer">
          <div>
            <Puzzle
              puzzle={this.props.puzzle}
              editable={this.isEditable()}
              shadeable={this.isShadeable()}
            />
          </div>
          <div>
            <Next/>
          </div>
        </Container>

        <Dimmer active={this.props.loading ? true : false}>
          <Loader size='large'>Creating puzzle</Loader>
        </Dimmer>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    puzzle: state.newPuzzle,
    direction: state.direction,
    selectedCell: state.selectedCell,
    interaction: state.interactionType,
    enteredLetters: state.enteredLetters,
    loading: state.loading
  }
}

export default connect(mapStateToProps, { updateAcrossClue, updateDownClue, updateTitle, updatingPuzzle, setFormStage, enterLetter, selectCell, deselectCell, resetAllLetters, clearNewPuzzle, setLetters, toggleInteractionType, savedPuzzle })(ShadePage)
