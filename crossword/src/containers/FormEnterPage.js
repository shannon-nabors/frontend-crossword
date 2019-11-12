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
         resetAllLetters,
         selectClue,
         toggleDirection } from '../redux/actions/puzzleInteraction.js'
import Puzzle from './Puzzle'

class EnterPage extends Component {
  state = {
    redirect: false,
    failed: false
  }

  componentDidMount() {
    // document.addEventListener("keydown", this.handleKeyPress)
  }

  componentWillUnmount() {
    // document.removeEventListener("keydown", this.handleKeyPress)
    this.props.resetAllLetters()
    this.props.deselectCell()
    this.props.setFormStage("size")
  }

  findWord(ce) {
    let word = this.props.puzzle.cells.filter(cell => cell.clues.find(clue => clue.id === (ce.clues.find(c => this.props.direction === "across" ? c.direction === "across" : c.direction === "down")).id) )

    return word.sort((a, b) => a.id - b.id)
  }

  findNewDirectionWord(ce, dir) {
    let word = this.props.puzzle.cells.filter(cell => cell.clues.find(clue => clue.id === (ce.clues.find(c => dir === "across" ? c.direction === "across" : c.direction === "down")).id))

    return word.sort((a, b) => a.id - b.id)
  }

  handleClueClick = (clue) => {
    let sel = this.props.puzzle.cells.find(cell => cell.number === clue.number)
    this.props.selectClue(clue)
    // below is a temp. workaround for delay w/toggling dir.
    this.props.selectCell(sel, this.findNewDirectionWord(sel, clue.direction))
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
            id="enter-header"
            attached="top">
            Step 3: Clue
          </Header>
          <Segment attached>Enter clues and give your puzzle a title!</Segment>
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
                    answers="true"
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
                      id={this.props.clue && this.props.clue.id === c.id ? "selected-clue" : null}
                      onClick={() => this.handleClueClick(c)}
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
                      id={this.props.clue && this.props.clue.id === c.id ? "selected-clue" : null}
                      onClick={() => this.handleClueClick(c)}
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
    enteredLetters: state.enteredLetters,
    clue: state.selectedClue
  }
}

export default connect(mapStateToProps, { updateAcrossClue, updateDownClue, updateTitle, updatingPuzzle, setFormStage, setKey, selectCell, deselectCell, resetAllLetters, clearNewPuzzle, setLetters, createdPuzzle, toggleDirection, selectClue })(EnterPage)
