import React from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import { lettersInWord } from '../helpers/puzzleHelpers'
import SearchCell from './SearchCell'

class WordFinder extends React.Component {
    constructor() {
        super()
        this.state = {selected: null}
    }

    selectBox = (id) => {
        this.setState({selected: id})
    }

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
                <SearchCell
                    key={cell.id} cell={cell} index={i}
                    selected={this.state.selected === cell.id ? true : false}
                    select={this.selectBox}
                />
            )
        })
    }

    render() {
        let {interaction, enteredLetters, highlightedCells, selectedCell} = this.props
        return(
            <Segment color={interaction == "search" ? "yellow" : ""} clearing>
                {interaction == "search" && highlightedCells && selectedCell ?
                    <svg pointer-events="all" viewBox={`0 0 150 15`} xmlns="http://www.w3.org/2000/svg">
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