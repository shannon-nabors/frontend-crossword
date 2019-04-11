import React, { Component, Fragment } from 'react'
import { Grid, Container, Form, Segment, Button, Dimmer, Loader } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateAcrossClue, updateDownClue, updateTitle,  updatingPuzzle, settingKey, selectCell, deselectCell, resetAllLetters, clearNewPuzzle, setLetters, createdPuzzle } from '../redux/actions'
import Puzzle from './Puzzle'

class EnterPage extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
    this.props.resetAllLetters()
    this.props.deselectCell()
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
        this.props.settingKey(this.props.selectedCell.id, null)
        this.props.selectCell(this.shiftSelectedCellBackward(), this.findWord())
      } else if (event.key.length === 1) {
        this.props.settingKey(this.props.selectedCell.id, event.key.toUpperCase())
        this.props.selectCell(this.shiftSelectedCellForward(), this.findWord())
      }
    }
  }



  handleSubmit = () => {
    this.props.setLetters()
    this.props.updatingPuzzle("enter")
    this.props.createdPuzzle()
    // this.props.clearNewPuzzle()
    this.setState({ redirect: true })
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
        <Form onSubmit={this.handleSubmit}>
          <Grid columns={3} divided>
            <Grid.Column>
              <Container id="puz-sizer">
                <Form.Input
                  placeholder="Title"
                  name="title"
                  onChange={this.handleTitleChange}
                >
                </Form.Input>
                <Puzzle
                  puzzle={this.props.puzzle}
                  editable="true"
                  shadeable={null}
                />
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

          <div>
            <Button type='submit'>Submit</Button>
          </div>
        </Form>

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
    loading: state.loading
  }
}

export default connect(mapStateToProps, { updateAcrossClue, updateDownClue, updateTitle, updatingPuzzle, settingKey, selectCell, deselectCell, resetAllLetters, clearNewPuzzle, setLetters, createdPuzzle })(EnterPage)
