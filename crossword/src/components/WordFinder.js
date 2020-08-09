import React from 'react'
import { connect } from 'react-redux'
import { Segment, Button, Icon, List } from 'semantic-ui-react'
import { lettersInWord } from '../helpers/puzzleHelpers'
import SearchWord from './SearchWord'

class WordFinder extends React.Component {
    render() {
        let {interaction, highlightedCells, selectedCell} = this.props
        return(
            <Segment
                id="word-finder"
                color={interaction === "search" ? "yellow" : ""}
                clearing
            >
                {interaction === "search" && highlightedCells && selectedCell ?
                    <SearchWord/>
                    : <div><div>
                        <Button icon color="black"
                            active={this.props.interaction === "search"}
                            onClick={ () => this.props.handleInteractionChange("search")}
                            ><Icon name="search"></Icon>
                        </Button> Click here to search for possible fill.</div>
                        <br></br>
                        <List>
                            <List.Item>
                                <List.Icon name="pencil"></List.Icon>
                                <List.Content>Selecting words in the puzzle will autofill the search bar.</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name="font"></List.Icon>
                                <List.Content>You can add specific letters to your search by entering them in a letter space.</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name="at"></List.Icon>
                                <List.Content>Use the @ symbol to indicate any vowel.</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name="hashtag"></List.Icon>
                                <List.Content>Use the # symbol to indicate any consonant.</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name="sort amount up"></List.Icon>
                                <List.Content>Results are ordered (roughly) by frequency, with more commonly used words/phrases at the top.</List.Content>
                            </List.Item>
                        </List>
                        <br></br>
                        This search feature uses the <a href="https://www.datamuse.com/api/">Datamuse API</a>.
                        </div>}
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