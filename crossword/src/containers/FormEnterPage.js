import React, { Component, Fragment } from 'react'
import { Grid, Container, Header,
         Form, Segment, Message,
         Button, Dimmer, Loader } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { size, values } from 'lodash'
import { createdPuzzle } from '../redux/actions/changePuzzles.js'
import { updatingPuzzle,
         setLetters,
         updateAcrossClue,
         updateDownClue,
         updateTitle,
         setFormStage,
         clearNewPuzzle } from '../redux/actions/createPuzzle.js'
import { selectCell,
         deselectCell,
         setKey,
         resetAllLetters } from '../redux/actions/puzzleInteraction.js'
import Puzzle from './Puzzle'

class EnterPage extends Component {
  state = {
    redirect: false,
    failed: false
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
    this.props.resetAllLetters()
    this.props.deselectCell()
    this.props.setFormStage("size")
  }

  findWord() {
    let word = this.props.puzzle.cells.filter(cell => cell.clues.find(clue => clue.id === (this.props.selectedCell.clues.find(c => this.props.direction === "across" ? c.direction === "across" : c.direction === "down")).id) )

    return word.sort((a, b) => a.id - b.id)
  }

  shiftSelectedCellForward() {
    return this.findWord().find(c => c.id > this.props.selectedCell.id) ? this.findWord().find(c => c.id > this.props.selectedCell.id) : this.props.selectedCell
  }

  shiftSelectedCellBackward() {
    let previousLetters = this.findWord().filter(c => c.id < this.props.selectedCell.id)
    return this.findWord().find(c => c.id < this.props.selectedCell.id) ? previousLetters[previousLetters.length - 1]: this.props.selectedCell
  }

  handleKeyPress = (event) => {
    if (this.props.selectedCell && document.activeElement.type !== "text") {
      if (event.key === "Backspace") {
        this.props.setKey(this.props.selectedCell.id, null)
        this.props.selectCell(this.shiftSelectedCellBackward(), this.findWord())
      } else if (event.key.length === 1) {
        this.props.setKey(this.props.selectedCell.id, event.key.toUpperCase())
        this.props.selectCell(this.shiftSelectedCellForward(), this.findWord())
      }
    }
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

  handleSubmit = () => {
    if (this.checkForCompletion()) {
      this.props.setLetters()
      this.props.updatingPuzzle("enter")
      this.props.createdPuzzle()
      this.setState({ redirect: true })
    } else {
      this.setState({failed: true})
    }
  }

  handleTitleChange = (e, { value }) => {
    this.props.updateTitle(value)
  }

  handleAcrossChange = (e, { name, value }) => {
    this.props.updateAcrossClue(name, value)
  }

  handleDownChange = (e, { name, value }) => {
    this.props.updateDownClue(name, value)
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/home"/>
    }

    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
      )
    }

    return (
      <Fragment>
        <Container>
          <Header
            as="h2"
            attached="top">
            Step 3: Enter your letters and clues
          </Header>
          <Segment attached>Click on a square to enter a letter, and click the same square to toggle the word direction.</Segment>
          <Form
            error={this.state.failed}
            onSubmit={this.handleSubmit}
            id="enter-form"
          >
            <Grid columns={4}>
              <Grid.Column width={8}>
                <Container id="enter-sizer">
                  <Form.Input
                    placeholder="Title"
                    name="title"
                    onChange={this.handleTitleChange}
                  >
                  </Form.Input>
                  <Message
                    error
                    content="Please don't leave any fields blank"
                  />
                  <Puzzle
                    puzzle={this.props.puzzle}
                    editable="true"
                    shadeable={null}
                  />
                  <div>
                    <Button color="black" type='submit'>Submit</Button>
                  </div>
                </Container>
              </Grid.Column>

              <Grid.Column>
                <h4>Across</h4>
                <Segment id="clue-box">
                  {this.props.puzzle.across_clues.sort((a,b) => a.number - b.number ).map(c => (
                    <Form.Input
                      key={c.id}
                      label={c.number}
                      name={c.id}
                      onChange={this.handleAcrossChange}
                    >
                    </Form.Input>
                  ))}
                </Segment>
              </Grid.Column>

              <Grid.Column>
                <h4>Down</h4>
                <Segment id ="clue-box">
                  {this.props.puzzle.down_clues.sort((a,b) => a.number - b.number ).map(c => (
                    <Form.Input
                      key={c.id}
                      label={c.number}
                      name={c.id}
                      onChange={this.handleDownChange}
                    >
                    </Form.Input>
                  ))}
                </Segment>
              </Grid.Column>
            </Grid>
          </Form>
        </Container>

        <Dimmer active={this.props.loading ? true : false}>
          <Loader size='large'>Creating clues</Loader>
        </Dimmer>

      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    puzzle: state.newPuzzle,
    selectedCell: state.selectedCell,
    direction: state.direction,
    loading: state.loading,
    enteredLetters: state.enteredLetters
  }
}

export default connect(mapStateToProps, { updateAcrossClue, updateDownClue, updateTitle, updatingPuzzle, setFormStage, setKey, selectCell, deselectCell, resetAllLetters, clearNewPuzzle, setLetters, createdPuzzle })(EnterPage)
