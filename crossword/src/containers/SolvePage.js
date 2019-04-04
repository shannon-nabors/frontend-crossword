import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Puzzle from './Puzzle'
import { settingKey, selectCell } from '../redux/actions'

class SolvePage extends Component {

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
  }

  handleKeyPress = (event) => {
    let h = this.props.puzzle.cells.filter(c => this.props.selectedCell.fellow_across.includes(c.id))
    let cell = h.find(c => c.id > this.props.selectedCell.id)
    this.props.settingKey(this.props.selectedCell.id, event.key.toUpperCase())
    this.props.selectCell(cell)
  }

  render() {
    return (
      <Fragment>
        <h2>{this.props.puzzle && this.props.puzzle.title}</h2>
        <div className="ui container" id="puz-sizer">
          <Puzzle
            puzzle={this.props.puzzle}
            editable="true"
          />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    puzzle: state.puzzles.find(p => p.id === parseInt(ownProps.match.params.puzzleID)),
    selectedCell: state.selectedCell,
    highlightedCells: state.highlightedCells
  }
}

export default connect(mapStateToProps, { settingKey, selectCell })(SolvePage)
