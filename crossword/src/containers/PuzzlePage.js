import React, { Component } from 'react'
import { Grid, Segment, Icon,
         Container, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Puzzle from './Puzzle'
import DeleteButton from '../components/DeletePuzzleButton'

class PuzzlePage extends Component {

  formatTime() {
    let time = this.props.time
    let minutes = Math.floor(time/60)
    minutes.toString().length === 1 ? minutes = `0${minutes.toString()}` : minutes = minutes.toString()
    let hours = Math.floor(minutes/60).toString()
    hours.length === 1 ? hours = `0${hours}` : hours = hours
    let seconds = (time % 60).toString()
    seconds.length === 1 ? seconds = `0${seconds}` : seconds = seconds
    return `${hours}:${minutes}:${seconds}`
  }

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
              ) : (
                <div>
                  <Header as="h4" id="puz-author">by {puzzle && puzzle.constructor.name}</Header>
                  <span><Icon color="yellow" size="big" name="star" id="solve-badge"/>You solved in {this.formatTime()}.  See how others compare</span>
                </div>
              )}
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
    user: state.currentUser,
    time: state.solves.find(s => s.puzzle_id === parseInt(ownProps.match.params.puzzleID)).time
  }
}

export default connect(mapStateToProps)(PuzzlePage)
