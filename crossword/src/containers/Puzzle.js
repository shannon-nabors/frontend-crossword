import React, { Component } from 'react'
import Cell from '../components/Cell'
import TypingFunctions from '../components/TypingFunctions'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'

class Puzzle extends Component {

  makePathData(num) {
    let pathData = ""
    for (let n = num; n > 1; n--) {
      pathData = pathData.concat(" ", ` M 3 ${23*n-20} l ${23*num + 3} 0 M ${23*n-20} 3 l 0 ${23*num + 3}`)
    }
    return pathData
  }

  findIfWon() {
    if (isEqual(this.props.puzzle.correct_letters, this.props.enteredLetters) && this.props.stage !== "enter") {
      return true
    } else {
      return false
    }
  }

  render() {
    let cells = this.props.puzzle && this.props.puzzle.cells
    let dimension = cells ? Math.sqrt(cells.length) : 0

    return (<>
      <svg
      viewBox={`0 0 ${23 * dimension + 6} ${23 * dimension +6}`}
      preserveAspectRatio="xMidYMin meet"
      xmlns="http://www.w3.org/2000/svg"
      display={this.props.invisible ? "none":"inline"}
      className={this.props.cursorClass ? this.props.cursorClass : this.props.interaction}
      >
      {this.props.editable ? <TypingFunctions
        puzzle={this.props.puzzle}
        solvable={this.props.solvable}
        checkForWin={this.props.checkForWin}
        rebusEnabled={this.props.rebusEnabled}
      /> : null}
        <g>
          {cells && cells.map(c =>
            <Cell
              key={c.id}
              puzzle={this.props.puzzle}
              cell={c}
              editable={this.props.editable ? !this.findIfWon() : null}
              shadeable={this.props.shadeable}
              circleable={this.props.circleable}
              answers={this.props.answers}
            />
          )}
        </g>
        <g>
          <path
            d={this.makePathData(dimension)}
            stroke="dimgray">
          </path>
          <rect
            x="1.50"
            y="1.50"
            width={ (23 * dimension + 3).toString() }
            height={ (23 * dimension + 3).toString() }
            stroke="#1b1c1d"
            strokeWidth="3.00"
            fill="none">
          </rect>
        </g>
      </svg>
    </>)
  }
}

const mapStateToProps = (state) => {
  return {
    enteredLetters: state.enteredLetters,
    stage: state.formStage,
    interaction: state.interactionType
  }
}

export default connect(mapStateToProps)(Puzzle)
