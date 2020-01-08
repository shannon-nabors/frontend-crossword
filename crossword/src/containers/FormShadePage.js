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
         setKey,
         resetAllLetters } from '../redux/actions/puzzleInteraction.js'
import { savedPuzzle } from '../redux/actions/changePuzzles.js'
import Next from '../components/FormNextButton'
import DeleteButton from '../components/DeletePuzzleButton'
import Puzzle from './Puzzle'

class ShadePage extends Component {

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
    // Interaction type is automatically set to "shade" in state
    this.props.toggleInteractionType("shade")
    this.props.deselectCell()
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
    this.props.deselectCell()
    this.props.resetAllLetters()
  }

  handleInteractionChange(buttonType) {
    // Set interaction type in state, depending on which button was clicked
    this.props.toggleInteractionType(buttonType)
    if (buttonType === "letter" && this.props.interaction !== "letter") {
      // Setup is what re-shades and numbers the puzzle
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

  findWord(ce) {
    let word = this.props.puzzle.cells.filter(cell => cell.clues.find(clue => clue.id === (ce.clues.find(c => this.props.direction === "across" ? c.direction === "across" : c.direction === "down")).id) )

    return word.sort((a, b) => a.id - b.id)
  }

  shiftSelectedCellForward() {
    let sel = this.props.selectedCell
    // let cells = this.props.puzzle.cells.sort((a, b) => a.id - b.id)
    let next = this.findWord(sel).find(c => c.id > sel.id)
    return next ? next : sel
    // return this.findWord().find(c => c.id > this.props.selectedCell.id) ? this.findWord().find(c => c.id > this.props.selectedCell.id) : this.props.selectedCell
  }

  shiftSelectedCellBackward() {
    let sel = this.props.selectedCell
    let previousLetters = this.findWord(sel).filter(c => c.id < this.props.selectedCell.id)
    return this.findWord(sel).find(c => c.id < this.props.selectedCell.id) ? previousLetters[previousLetters.length - 1]: this.props.selectedCell
  }

  handleKeyPress = (event) => {
    let sel = this.props.selectedCell
    if (this.props.selectedCell && document.activeElement.type !== "text") {
      if (event.key === "Backspace") {
        this.props.setKey(this.props.selectedCell.id, null)
        this.props.selectCell(this.shiftSelectedCellBackward(), this.findWord(sel))
      } else if (event.key === "Tab"){
        this.props.selectCell(this.findNextWordStart(), this.findWord(this.findNextWordStart()))
      } else if (event.key.length === 1) {
        this.props.setKey(this.props.selectedCell.id, event.key.toUpperCase())
        this.props.selectCell(this.shiftSelectedCellForward(), this.findWord(sel))
      }
    }
  }

  findNextWordStart() {
    //Set variables
    let dir = this.props.direction
    let sel = this.props.selectedCell
    let puz = this.props.puzzle

    //Get all cells, in order, only the unshaded ones
    let cells = puz.cells.sort((a, b) => a.id - b.id).filter(c => c.shaded === false)

    // Set the clue (if current direction is across,
    // it's the selected cell's across clue, and vice versa)
    let clue = (sel.clues.find(c => dir === "across" ? c.direction === "across" : c.direction === "down").id)
    
    // Using the puzzle's "across clues" and "down clues" arrays,
    // Find the clue with the next greatest id from this one
    let nextClue = (dir === "across" ? puz.across_clues.find(c => c.id > clue) : puz.down_clues.find(c => c.id > clue))

    // If there's no next clue (if we're at the bottom of the puzzle)
    // Just stay on the same cell
    if (!nextClue) {
      return sel
    }

    // If there is a next clue,
    // Find the first cell that has it as one of its clues
    let next = cells.find(cell => cell.clues.find(c => c.id === nextClue.id))
    let nextID = next.id

    if (this.props.enteredLetters[nextID]) {
      // next = cells.find(cell => cell.id === nextID + 1)
      next = this.findWord(next).find(cell => !this.props.enteredLetters[cell.id])
      if (!next) {
        return sel
      }
    }

    return next
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
              <DeleteButton puzzle={this.props.puzzle}></DeleteButton>
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

export default connect(mapStateToProps, { updateAcrossClue, updateDownClue, updateTitle, updatingPuzzle, setFormStage, setKey, selectCell, deselectCell, resetAllLetters, clearNewPuzzle, setLetters, toggleInteractionType, savedPuzzle })(ShadePage)
