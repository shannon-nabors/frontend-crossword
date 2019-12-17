import React, { Component, Fragment } from 'react'
import ShadePage from './FormShadePage'
import EnterPage from './FormEnterPage'
import { connect } from 'react-redux'
import { setFormStage, updatedPuzzle, setEnteredLetters } from '../redux/actions/createPuzzle'
import { resetAllLetters } from '../redux/actions/puzzleInteraction'

// Form to resume a saved puzzle
class SavedPage extends Component {

  componentDidMount() {

    let puz = this.props.puzzle

    // Set newPuzzle in state as this saved puzzle
    this.props.updatedPuzzle(puz)

    // Set enteredLetters according to this puzzle's letters
    let letters = this.generateEnteredLetters(puz)
    this.props.setEnteredLetters(letters)

    // Set stage based on whether puzzle is filled in
    let stage = this.allCellsFilled(puz) ? "enter" : "shade"
    this.props.setFormStage(stage)

  }

  componentWillUnmount() {
    this.props.resetAllLetters()
  }

  unshadedCells(puzzle) {
    return puzzle.cells.filter( cell => !cell.shaded )
  }

  allCellsFilled(puzzle) {
    return !this.unshadedCells(puzzle).find(cell => {
      return !cell.letter
    })
  }

  generateEnteredLetters(puzzle) {
    let letters = {}
    this.unshadedCells(puzzle).forEach(cell => {
        letters[cell.id] = cell.letter
    })
    return letters
  }

  render() {
    return(
      <Fragment>

        {this.props.stage === "shade" && (
          <ShadePage/>
        )}

        {this.props.stage === "enter" && (
          <EnterPage/>
        )}

      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stage: state.formStage,
    puzzle: state.savedPuzzles.find(p => p.id === parseInt(ownProps.match.params.puzzleID))
  }
}

export default connect(mapStateToProps, { setFormStage,
                                          updatedPuzzle,
                                          setEnteredLetters,
                                          resetAllLetters })(SavedPage)