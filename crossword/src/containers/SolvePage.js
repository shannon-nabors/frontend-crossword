import React, { Component, Fragment } from 'react'
import { Grid, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { settingKey,
         selectCell,
         deselectCell,
         resetAllLetters,
         toggleGameStatus } from '../redux/actions'
import { isEqual } from 'lodash'
import Puzzle from './Puzzle'
import ResultsModal from '../components/ResultsModal'

class SolvePage extends Component {

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
    this.props.resetAllLetters()
    this.props.deselectCell()
  }

  findWord() {
    return this.props.puzzle.cells.filter(c => this.props.direction === "across" ?  this.props.selectedCell.fellow_across.includes(c.id) : this.props.selectedCell.fellow_down.includes(c.id))
  }

  shiftSelectedCellForward() {
    return this.findWord().find(c => c.id > this.props.selectedCell.id) ? this.findWord().find(c => c.id > this.props.selectedCell.id) : this.props.selectedCell
  }

  shiftSelectedCellBackward() {
    let previousLetters = this.findWord().filter(c => c.id < this.props.selectedCell.id)
    return this.findWord().find(c => c.id < this.props.selectedCell.id) ? previousLetters[previousLetters.length - 1]: this.props.selectedCell
  }

  handleKeyPress = (event) => {
    if (event.key === "Backspace") {
      this.props.settingKey(this.props.selectedCell.id, null)
      this.props.selectCell(this.shiftSelectedCellBackward())
    } else if (event.key.length === 1) {
      this.props.settingKey(this.props.selectedCell.id, event.key.toUpperCase())
      this.props.selectCell(this.shiftSelectedCellForward())
    }
    if (isEqual(this.props.enteredLetters, this.props.puzzle.correct_letters)) {
      this.props.toggleGameStatus()
      document.removeEventListener("keydown", this.handleKeyPress)
    }
  }

  render() {
    let { puzzle } = this.props
    return (
      <Fragment>
        <Container>
          <Grid columns={3} divided>
            <Grid.Column>
              <div className="ui container" id="puz-sizer">
                <h2>{puzzle && puzzle.title}</h2>
                <h4>by {puzzle && puzzle.constructor.name}</h4>
                <Puzzle
                  key={puzzle && puzzle.id}
                  puzzle={puzzle}
                  editable="true"
                />
              </div>
            </Grid.Column>

            <Grid.Column>
              <div>
                <h4>Across</h4>
                { puzzle && puzzle.across_clues.map(c => (
                  <p key={c && c.id}>{c.number}. {c.content}</p>
                ))}
              </div>
            </Grid.Column>

            <Grid.Column>
            <div>
              <h4>Down</h4>
              { puzzle && puzzle.down_clues.map(c => (
                <p key={c && c.id}>{c.number}. {c.content}</p>
              ))}
            </div>
            </Grid.Column>
          </Grid>
        </Container>

        {this.props.gameStatus === "won" && (
          <ResultsModal />
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    puzzle: state.puzzles.find(p => p.id === parseInt(ownProps.match.params.puzzleID)),
    selectedCell: state.selectedCell,
    highlightedCells: state.highlightedCells,
    direction: state.direction,
    enteredLetters: state.enteredLetters,
    gameStatus: state.gameStatus
  }
}

export default connect(mapStateToProps, { settingKey, selectCell, deselectCell, toggleGameStatus, resetAllLetters })(SolvePage)
