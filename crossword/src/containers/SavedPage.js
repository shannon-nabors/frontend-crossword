import React, { Component, Fragment } from 'react'
import ShadePage from './FormShadePage'
import EnterPage from './FormEnterPage'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setFormStage, updatedPuzzle, setEnteredLetters } from '../redux/actions/createPuzzle'
import { allCellsFilled, generateEnteredLetters } from '../helpers/puzzleHelpers'
import { resetAllLetters } from '../redux/actions/puzzleInteraction'
import { fetchingPuzzle, loading } from '../redux/actions/changePuzzles.js'
import { isEmpty } from 'lodash'

// Form to resume a saved puzzle
class SavedPage extends Component {

  componentDidMount() {
    this.props.loading()
    this.props.fetchingPuzzle(this.props.match.params.puzzleID, true)
    if (!isEmpty(this.props.puzzle)) {
      let puz = this.props.puzzle
      // Set newPuzzle in state as this saved puzzle
      this.props.updatedPuzzle(puz)

      // Set enteredLetters according to this puzzle's letters
      let letters = generateEnteredLetters(puz)
      this.props.setEnteredLetters(letters)

      // Set stage based on whether puzzle is filled in
      let stage = allCellsFilled(puz) ? "enter" : "shade"
      // let stage = "shade"
      this.props.setFormStage(stage)
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEmpty(this.props.puzzle) && (isEmpty(prevProps.puzzle) || prevProps.puzzle.id != this.props.puzzle.id)) {
      let puz = this.props.puzzle
      // Set newPuzzle in state as this saved puzzle
      this.props.updatedPuzzle(puz)

      // Set enteredLetters according to this puzzle's letters
      let letters = generateEnteredLetters(puz)
      this.props.setEnteredLetters(letters)

      // Set stage based on whether puzzle is filled in
      let stage = allCellsFilled(puz) ? "enter" : "shade"
      // let stage = "shade"
      this.props.setFormStage(stage)
    }
  }

  belongsToCurrentUser() {
    let { puzzle, user } = this.props
    if (isEmpty(puzzle)) return true
    return (puzzle && user.id && user.id === puzzle.constructor.id)
  }

  componentWillUnmount() {
    this.props.resetAllLetters()
    this.props.updatedPuzzle({})
  }

  render() {
    if (!this.belongsToCurrentUser()) { return <Redirect to="/home"/> }
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
    user: state.currentUser,
    puzzle: state.newPuzzle
  }
}

export default connect(mapStateToProps, { setFormStage,
                                          updatedPuzzle,
                                          setEnteredLetters,
                                          loading,
                                          fetchingPuzzle,
                                          resetAllLetters })(SavedPage)