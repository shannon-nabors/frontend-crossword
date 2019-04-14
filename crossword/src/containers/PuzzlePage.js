import React, { Component } from 'react'
import { Grid, Segment, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Puzzle from './Puzzle'
import DeleteButton from '../components/DeletePuzzleButton'

class PuzzlePage extends Component {
  render() {
    let { puzzle, user } = this.props

    return (
      <Container>
        <Grid columns={4}>
          <Grid.Column width={8}>
            <Container id="puz-sizer">
              <h2>{puzzle && puzzle.title}</h2>
              {puzzle && user.id === puzzle.constructor.id ? (
                <DeleteButton puzzle={puzzle}/>
              ) : <h4>by {puzzle && puzzle.constructor.name}</h4>}
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
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    puzzle: [...state.userPuzzles, ...state.solvedPuzzles].find(p => p.id === parseInt(ownProps.match.params.puzzleID)),
    user: state.currentUser
  }
}

export default connect(mapStateToProps)(PuzzlePage)
