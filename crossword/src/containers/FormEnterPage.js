import React, { Component } from 'react'
import { Grid, Container, Form, Segment, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { URL, updateAcrossClue, updateDownClue } from '../redux/actions'
import Puzzle from './Puzzle'

class EnterPage extends Component {
  // state = {
  //   "1Across": '',
  //   "1Down": '',
  // }

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

  // handleSubmit = () => {
  //   console.log('hi')
  //   fetch(URL)
  // }

  handleAcrossChange = (e, { name, value }) => {
    this.props.updateAcrossClue(name, value)
  }

  handleDownChange = (e, { name, value }) => {
    this.props.updateDownClue(name, value)
  }

  render() {
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
            <Segment style={{overflow: 'auto', maxHeight: 500}}>
              {this.props.puzzle.across_clues.map(c => (
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
            <Segment style={{overflow: 'auto', maxHeight: 500}}>
              {this.props.puzzle.down_clues.map(c => (
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

export default connect(mapStateToProps, { updateAcrossClue, updateDownClue })(EnterPage)
