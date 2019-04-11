import React, { Component, Fragment } from 'react'
import { Grid, Segment, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Puzzle from './Puzzle'
import DeleteButton from '../components/DeletePuzzleButton'

class PuzzlePage extends Component {
  render() {
    let { puzzle } = this.props

    return (
      <Grid columns={3} divided>
        <Grid.Column>
          <Container id="puz-sizer">
            <h2>{puzzle && puzzle.title}</h2>
            <h4>by {puzzle && puzzle.constructor.name}</h4>
            <DeleteButton puzzle={puzzle}/>
            <Puzzle
              puzzle={puzzle}
              answers="true"
            />
          </Container>
        </Grid.Column>

        <Grid.Column>
          <h4>Across</h4>
          <Segment id ="clue-box">
            { puzzle && puzzle.across_clues.sort((a,b) => a.number - b.number ).map(c => (
              <p key={c && c.id}>{c.number}. {c.content}</p>
            ))}
          </Segment>
        </Grid.Column>

        <Grid.Column>
          <h4>Down</h4>
          <Segment id ="clue-box">
            { puzzle && puzzle.down_clues.sort((a,b) => a.number - b.number ).map(c => (
              <p key={c && c.id}>{c.number}. {c.content}</p>
            ))}
          </Segment>
        </Grid.Column>

      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    puzzle: state.userPuzzles.find(p => p.id === parseInt(ownProps.match.params.puzzleID))
  }
}

export default connect(mapStateToProps)(PuzzlePage)
