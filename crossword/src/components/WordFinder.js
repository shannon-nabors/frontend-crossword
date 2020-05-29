import React from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import { lettersInWord } from '../helpers/puzzleHelpers'

class WordFinder extends React.Component {
    currentWord() {
        let {enteredLetters, highlightedCells, selectedCell} = this.props
        return lettersInWord(enteredLetters, highlightedCells, selectedCell)
    }

    wordLength() {
        return this.currentWord().length
    }

    letterBoxes() {
        return this.currentWord().map((cell, i) => {
            return (
                <g key={cell.id}>
                    <rect x={12 * i + 1} y="1" rx="2" ry="2" width="10" height="10" fill={cell.letter ? "#FFC368" : "none"} stroke="#1b1c1d" strokeWidth="0.25"/>
                    <text x={12 * i + 3} y="9" textAnchor="start" fontSize="9" fill="#1b1c1d">{cell.letter}</text>
                </g>
            )
        })
    }

    render() {
        let {interaction, enteredLetters, highlightedCells, selectedCell} = this.props
        return(
            <Segment color={interaction == "search" ? "yellow" : ""} clearing>
                {interaction == "search" && highlightedCells && selectedCell ?
                    <svg viewBox={`0 0 150 15`} xmlns="http://www.w3.org/2000/svg">
                        {this.currentWord() ? this.letterBoxes() : null}
                    </svg>
                    : "WORDS"}
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      puzzle: state.newPuzzle,
      direction: state.direction,
      selectedCell: state.selectedCell,
      interaction: state.interactionType,
      enteredLetters: state.enteredLetters,
      highlightedCells: state.highlightedCells
    }
}

export default connect(mapStateToProps, {lettersInWord })(WordFinder)