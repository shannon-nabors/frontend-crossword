import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import Puzzle from './Puzzle'

class EnterPage extends Component {

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

  render() {
    return(
      <Container id="puz-sizer">
        <div>
          <Puzzle
            puzzle={this.props.puzzle}
            editable="true"
            shadeable={null}
          />
        </div>
        <div>
          <Button>Submit</Button>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    puzzle: state.newPuzzle
  }
}

export default connect(mapStateToProps)(EnterPage)
