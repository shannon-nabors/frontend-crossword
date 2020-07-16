import React, { Component, Fragment } from 'react'
import { Container, Dimmer, Loader,
         Header, Segment, Button, Icon, Grid } from 'semantic-ui-react'
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
import { findWord } from '../helpers/typingHelpers'
import { firstCell, firstAcrossWord, percentShaded } from '../helpers/puzzleHelpers'
import { savedPuzzle } from '../redux/actions/changePuzzles.js'
import Next from '../components/FormNextButton'
import DeleteButton from '../components/DeletePuzzleButton'
import Puzzle from './Puzzle'
import WordFinder from '../components/WordFinder'

class ShadePage extends Component {

  /////////////////////////////   SETUP    ////////////////////////////

  componentDidMount() {
    // document.addEventListener("keydown", this.handleKeyPress)
    this.props.toggleInteractionType("shade")
    this.props.deselectCell()
  }

  componentWillUnmount() {
    // document.removeEventListener("keydown", this.handleKeyPress)
    this.props.deselectCell()
    this.props.resetAllLetters()
  }

  componentDidUpdate(prevProps) {
    if(this.isEditable() && prevProps.loading === true) {
      let cells = this.props.puzzle.cells.sort((a, b) => a.id - b.id).filter(c => c.shaded === false)
      if (cells[0].clues.length > 0) {
        this.props.selectCell(cells[0], findWord(cells[0], cells, "across"))
      }
    }
  }

  handleInteractionChange = (buttonType) => {
    // Set interaction type in state, depending on which button was clicked
    // if (buttonType === "letter" && !this.isEditable()) {
      // this.props.updatingPuzzle("setup")
    if (this.props.interaction === "shade") {
      this.props.updatingPuzzle("setup")
    } else if (buttonType === "shade" && !this.isShadeable()) {
      this.props.deselectCell()
      this.props.setLetters()
      // this.props.updatingPuzzle("letter")
    }

    if (buttonType === "circle") {
      this.props.deselectCell()
    }

    if (buttonType === "search") {
      let {selectCell, selectedCell, puzzle} = this.props
      if (!selectedCell) {selectCell(firstCell(puzzle), firstAcrossWord(puzzle))}
    }
    this.props.toggleInteractionType(buttonType)
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

  isCircleable() {
    return (this.props.interaction === "circle")
  }

  percent() {
    let num = percentShaded(this.props.puzzle).toString().slice(0, 5)
    return `Black squares: ${num} %`
  }

  render() {
    // debugger
    return(
      <Grid centered columns={3}>
        <Grid.Column>
        <Container id="shade-header">
          <Segment clearing id="form-heading" attached="top">
            <Header as="h2" id="enter-header" floated="left">
              Fill
            </Header>

          </Segment>
          <Segment attached>
            Use the buttons above the puzzle to shade squares, fill the puzzle, add circles to certain squares.  Activate the search feature using the interface below.
          </Segment>
        </Container>
        <WordFinder handleInteractionChange={this.handleInteractionChange}/>
        <div>
          <Next/>
        </div>
        </Grid.Column>
        <Grid.Column>
        <Container id="form-toggler">
          <Button.Group color="black">
            <Button icon
              active={this.props.interaction === "shade"}
              onClick={() => this.handleInteractionChange("shade")}
            ><Icon name="eyedropper"></Icon></Button>
            <Button icon
              active={this.props.interaction === "letter"}
              onClick={ () => this.handleInteractionChange("letter")}
            ><Icon name="font"></Icon></Button>
            <Button icon
              active={this.props.interaction === "circle"}
              onClick={ () => this.handleInteractionChange("circle")}
            ><Icon name="circle outline"></Icon></Button>
          </Button.Group>
          {this.props.interaction === "shade" && this.props.puzzle.cells.length ? <span id="shaded-percent">{this.percent()}</span> : null}
          <Button.Group floated="right">
              <DeleteButton
                puzzle={this.props.puzzle}
                saved="true"
              />
              <Button 
                id="save-button" 
                icon color="black"
                onClick={ this.handleSave }>
                <Icon name="save"></Icon>
              </Button>
            </Button.Group>
        </Container>
        <Container id="shade-sizer">
          <div>
            <Puzzle
              puzzle={this.props.puzzle}
              editable={this.isEditable()}
              shadeable={this.isShadeable()}
              circleable={this.isCircleable()}
            />
          </div>
        </Container>
        </Grid.Column>
        <Dimmer active={this.props.loading ? true : false}>
          <Loader size='large'>Creating puzzle</Loader>
        </Dimmer>
      </Grid>
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
