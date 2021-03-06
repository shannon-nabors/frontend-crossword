import React from 'react'
import { connect } from 'react-redux'
import { Button, List } from 'semantic-ui-react'
import { lettersInWord } from '../helpers/puzzleHelpers'
import SearchCell from './SearchCell'

class SearchWord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: null,
            letters: this.starterWord(),
            suggestions: []
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress)
    }

    handleKeyPress = (event) => {
        if (event.key.length === 1 || event.key === "Backspace") {
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
                if (char === "Backspace") {
                    letter.letter = null
                } else {
                    letter.letter = char.toUpperCase()
                }
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
        let word = lettersInWord(enteredLetters, highlightedCells, selectedCell)
        return word.map(cell => {
            if (cell.letter) {
                cell.original = true
            }
            return cell
        })
    }

    currentWord = () => {
        let {enteredLetters, highlightedCells, selectedCell} = this.props
        let {letters} = this.state
        let word = lettersInWord(enteredLetters, highlightedCells, selectedCell)
        word = word.map(cell => {
            if (cell.letter) {
                cell.original = true
            }
            return cell
        })
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

    generateUrl = () => {
        let base = "https://api.datamuse.com/words?sp="
        this.state.letters.forEach(cell => {
            if (cell.letter && cell.letter !== "@" && cell.letter !== "#") {
                base = base + cell.letter.toLowerCase()
            } else {
                base = base + "?"
            }
        })
        return base
    }

    getSuggestions = () => {
        fetch(this.generateUrl())
        .then(r => r.json())
        .then(results => this.setState({suggestions: results}))
    }

    filterSuggestions = () => {
        this.getSuggestions()
        let {suggestions, letters} = this.state
        let pattern = ""
        letters.forEach(letter => {
            if (letter.letter) {
                pattern = pattern + letter.letter.toLowerCase()
            } else {
                pattern += "."
            }
        })
        pattern = pattern.replace(/@/g, "[aeiou]")
        pattern = pattern.replace(/#/g, "[^aeiou]")
        pattern = new RegExp(pattern)
        return suggestions.filter(suggestion => pattern.test(suggestion.word))
    }

    listResults = () => {
        if (this.state.suggestions === []) {return null}
        return this.filterSuggestions().map(suggestion => {
            return <List.Item>{suggestion.word}</List.Item>
        })
    }

    componentDidUpdate() {
        if (this.currentWord()[0].id !== this.state.letters[0].id || this.currentWord()[1].id !== this.state.letters[1].id) {
            // let word = this.currentWord()
            let {enteredLetters, highlightedCells, selectedCell} = this.props
            let word = lettersInWord(enteredLetters, highlightedCells, selectedCell)
            word = word.map(cell => {
                if (cell.letter) {
                    cell.original = true
                }
                return cell
            })
            console.log(word.map(letter => letter.letter))
            this.setState({letters: word, suggestions: []})
        }
    }

    render() {
        return(
            <div>
                <svg
                    pointer-events="all"
                    viewBox={`0 0 150 15`}
                    xmlns="http://www.w3.org/2000/svg">
                    {this.currentWord() ? this.letterBoxes() : null}
                </svg>
                <Button color="black" onClick={this.getSuggestions}>Search</Button>
                <List divided verticalAlign="middle">
                    {this.listResults()}
                </List>
            </div>
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