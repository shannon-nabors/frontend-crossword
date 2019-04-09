import React, { Component } from 'react'
import { Grid, Container, Form, Segment, Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { URL, updateAcrossClue, updateDownClue, updatingPuzzle } from '../redux/actions'
import Puzzle from './Puzzle'

class EnterPage extends Component {
  state = {
    redirect: false
  }

  // componentDidMount() {
  //   document.addEventListener("keydown", this.handleKeyPress)
  // }
  //
  // componentWillUnmount() {
  //   document.removeEventListener("keydown", this.handleKeyPress)
  //   this.props.resetAllLetters()
  //   this.props.deselectCell()
  // }
  //
  // findWord() {
  //   let word = this.props.puzzle.cells.filter(c => this.props.direction === "across" ?  this.props.selectedCell.fellow_across.includes(c.id) : this.props.selectedCell.fellow_down.includes(c.id))
  //   return word.sort((a, b) => a.id - b.id)
  // }
  //
  // shiftSelectedCellForward() {
  //   return this.findWord().find(c => c.id > this.props.selectedCell.id) ? this.findWord().find(c => c.id > this.props.selectedCell.id) : this.props.selectedCell
  // }
  //
  // shiftSelectedCellBackward() {
  //   let previousLetters = this.findWord().filter(c => c.id < this.props.selectedCell.id)
  //   return this.findWord().find(c => c.id < this.props.selectedCell.id) ? previousLetters[previousLetters.length - 1]: this.props.selectedCell
  // }
  //
  // handleKeyPress = (event) => {
  //   if (event.key === "Backspace") {
  //     this.props.settingKey(this.props.selectedCell.id, null)
  //     this.props.selectCell(this.shiftSelectedCellBackward())
  //   } else if (event.key.length === 1) {
  //     this.props.settingKey(this.props.selectedCell.id, event.key.toUpperCase())
  //     this.props.selectCell(this.shiftSelectedCellForward())
  //   }
  //   if (isEqual(this.props.enteredLetters, this.props.puzzle.correct_letters)) {
  //     this.props.toggleGameStatus()
  //     document.removeEventListener("keydown", this.handleKeyPress)
  //   }
  // }

  handleSubmit = () => {
    this.props.updatingPuzzle("enter")
    this.props.clearNewPuzzle()
    this.setState({ redirect: true })
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

    return(
      <Form onSubmit={this.handleSubmit}>
        <Grid columns={3} divided>
          <Grid.Column>
            <Container id="puz-sizer">
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
    )
  }
}

const mapStateToProps = (state) => {
  return {
    puzzle: state.newPuzzle
  }
}

export default connect(mapStateToProps, { updateAcrossClue, updateDownClue, updatingPuzzle })(EnterPage)
