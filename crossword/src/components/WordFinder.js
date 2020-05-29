import React from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import { lettersInWord } from '../helpers/puzzleHelpers'
import SearchWord from './SearchWord'

class WordFinder extends React.Component {
    render() {
        let {interaction, highlightedCells, selectedCell} = this.props
        return(
            <Segment
                color={interaction == "search" ? "yellow" : ""}
                clearing
            >
                {interaction == "search" && highlightedCells && selectedCell ?
                    <SearchWord/>
                    : "WORDS"}
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      selectedCell: state.selectedCell,
      interaction: state.interactionType,
      highlightedCells: state.highlightedCells
    }
}

export default connect(mapStateToProps, {lettersInWord })(WordFinder)