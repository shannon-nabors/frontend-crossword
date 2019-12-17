import React, { Component, Fragment } from 'react'
import ShadePage from './FormShadePage'
import EnterPage from './FormEnterPage'
import { connect } from 'react-redux'
import { setFormStage, updatedPuzzle, setEnteredLetters } from '../redux/actions/createPuzzle'
import { resetAllLetters } from '../redux/actions/puzzleInteraction'

// Form to resume a saved puzzle
class SavedPage extends Component {

  componentDidMount() {
    this.props.setFormStage("shade")
    if(this.props.puzzle) {
        // Set newPuzzle in state as this saved puzzle
        this.props.updatedPuzzle(this.props.puzzle)
        // Set enteredLetters according to this puzzle's letters
        let letters = this.generateEnteredLetters(this.props.puzzle)
        this.props.setEnteredLetters(letters)
        debugger
    }
  }

  componentWillUnmount() {
    this.props.resetAllLetters()
  }

  generateEnteredLetters(puzzle) {
    let letters = {}
    puzzle.cells.forEach(cell => {
        if (!cell.shaded) { letters[cell.id] = cell.letter }
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

export default connect(mapStateToProps, { setFormStage, updatedPuzzle, setEnteredLetters, resetAllLetters })(SavedPage)