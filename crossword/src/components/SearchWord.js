import React from 'react'
import { connect } from 'react-redux'
import { lettersInWord } from '../helpers/puzzleHelpers'
import SearchCell from './SearchCell'

class SearchWord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: null,
            letters: this.starterWord()
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress)
    }

    handleKeyPress = (event) => {
        if (event.key.length === 1) {
            this.updateLetters(event.key)
        }
    }

    updateLetters = (char) => {
        let {letters, selected} = this.state
        if (this.currentWord()[0].id !== letters[0].id || this.currentWord()[1].id !== letters[1].id) {
            letters = this.currentWord()
        }
        let newLetters = letters.map(letter => {
            if (letter.id === selected) {
                letter.letter = char.toUpperCase()
            }
            return letter
        })
        this.setState({letters: newLetters})
    }

    selectBox = (id) => {
        this.setState({selected: id})
    }

    starterWord = () => {
        let {enteredLetters, highlightedCells, selectedCell} = this.props
        return lettersInWord(enteredLetters, highlightedCells, selectedCell)
    }

    currentWord = () => {
        let {enteredLetters, highlightedCells, selectedCell} = this.props
        let {letters} = this.state
        let word = lettersInWord(enteredLetters, highlightedCells, selectedCell)
        word = word.map(displayLetter => {
            let enteredLetter = letters.find(l => l.id === displayLetter.id)
            if (enteredLetter) {
                displayLetter.letter = enteredLetter.letter
            }
            return displayLetter
        })
        return word
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
        return(
            <svg
                pointer-events="all"
                viewBox={`0 0 150 15`}
                xmlns="http://www.w3.org/2000/svg">
                {this.currentWord() ? this.letterBoxes() : null}
            </svg>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      selectedCell: state.selectedCell,
      enteredLetters: state.enteredLetters,
      highlightedCells: state.highlightedCells
    }
}

export default connect(mapStateToProps, {lettersInWord })(SearchWord)