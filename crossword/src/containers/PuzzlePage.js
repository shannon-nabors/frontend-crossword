import React, { Component } from 'react'
import { Grid, Segment, Container, Header } from 'semantic-ui-react'
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
              <Header as="h2" id="puz-title">{puzzle && puzzle.title}</Header>

              {puzzle && user.id === puzzle.constructor.id ? (
                <DeleteButton puzzle={puzzle}/>
              ) : <Header as="h4" id="puz-author">by {puzzle && puzzle.constructor.name}</Header>}
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
                <p key={c && c.id}><span className="clue-number">{c.number}</span> {c.content}</p>
              ))}
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <h4>Down</h4>
            <Segment id ="clue-box">
              { puzzle && puzzle.down_clues.sort((a,b) => a.number - b.number ).map(c => (
                <p key={c && c.id}><span className="clue-number">{c.number}</span> {c.content}</p>
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
