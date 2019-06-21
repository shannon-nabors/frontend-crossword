import React, { Component, Fragment } from 'react'
import { Container, Dimmer, Loader,
         Header, Segment, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { size, values } from 'lodash'
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
import Next from '../components/FormNextButton'
import Puzzle from './Puzzle'

class ShadePage extends Component {

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
    this.props.toggleInteractionType("shade")
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
    this.props.resetAllLetters()
    this.props.deselectCell()
    // this.props.setFormStage("size")
  }

  handleInteractionChange(interactionType) {
    this.props.toggleInteractionType(interactionType)
    if (interactionType === "letter" && this.props.interaction !== "letter") {
      this.props.updatingPuzzle("setup")
    } else if (interactionType === "shade" && this.props.interaction !== "shade") {
      this.props.deselectCell()
      this.props.updatingPuzzle("enter")
    }
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
    let cells = this.props.puzzle.cells.sort((a, b) => a.id - b.id)
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
      // next = cells.find(cell => cell.id === nextID + 1)
      next = this.findWord(next).find(cell => !this.props.enteredLetters[cell.id])
      if (!next) {
        return sel
      }
    }

    return next
  }

  checkForCompletion() {
    let letterCells = this.props.puzzle.cells.filter(c => c.shaded === false)
    if (!this.props.puzzle.title) {
      return false
    } else if (values(this.props.enteredLetters).includes(null)) {
      return false
    } else if (size(this.props.enteredLetters) !== letterCells.length) {
      console.log("entered: ", this.props.enteredLetters)
      console.log("size", size(this.props.enteredLetters))
      console.log("total: ", letterCells)
      console.log("size: ", letterCells.length)
      return false
    } else if (this.props.puzzle.across_clues.find(cl => cl.content === null)) {
      return false
    } else if (this.props.puzzle.down_clues.find(cl => cl.content === null)) {
      return false
    } else {
      return true
    }
  }

  render() {
    return(
      <Fragment>
        <Container id="shade-header">
          <Header
            as="h2"
            id="enter-header"
            attached="top">
            Step 2: Shade squares and enter letters
          </Header>
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
    loading: state.loading
  }
}

export default connect(mapStateToProps, { updateAcrossClue, updateDownClue, updateTitle, updatingPuzzle, setFormStage, setKey, selectCell, deselectCell, resetAllLetters, clearNewPuzzle, setLetters, toggleInteractionType })(ShadePage)
