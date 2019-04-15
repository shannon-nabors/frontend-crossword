import React, { Component, Fragment } from 'react'
import { Grid, Segment, Icon,
         Container, Header, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { findSolveData,
         resetPuzzleSolves } from '../redux/actions/stats'
import Puzzle from './Puzzle'
import DeleteButton from '../components/DeletePuzzleButton'

class PuzzlePage extends Component {
  state = { stats: false }

  componentWillUnmount() {
    this.props.resetPuzzleSolves()
  }

  formatTime(time) {
    let minutes = Math.floor(time/60)
    minutes.toString().length === 1 ? minutes = `0${minutes.toString()}` : minutes = minutes.toString()
    let hours = Math.floor(minutes/60).toString()
    hours.length === 1 ? hours = `0${hours}` : hours = hours
    let seconds = (time % 60).toString()
    seconds.length === 1 ? seconds = `0${seconds}` : seconds = seconds
    return `${hours}:${minutes}:${seconds}`
  }

  handleStatsClick = () => {
    this.props.findSolveData("puzzle", this.props.puzzle.id)
    this.setState({ stats: !this.state.stats })
  }

  render() {
    let { puzzle, user } = this.props

    return (
      <Container>
        <Grid columns={4}>
          <Grid.Column width={8}>
            <Container id="puz-sizer">
              <Header as="h2" id="puz-title">{puzzle && puzzle.title}</Header>

              {puzzle && user.id && user.id === puzzle.constructor.id ? (
                <DeleteButton puzzle={puzzle}/>
              ) : (
                <div>
                  <Header as="h4" id="puz-author">by {puzzle && puzzle.constructor.name}</Header>
                  <Button
                    icon
                    basic
                    labelPosition="left"
                    id="stats-button"
                    onClick={this.handleStatsClick}
                  >
                    <Icon color="yellow" size="big" name="star"/>
                    You solved in {this.formatTime(this.props.time)}! See how others compare.
                  </Button>
                </div>
              )}
              <Puzzle
                puzzle={puzzle}
                answers="true"
              />
            </Container>
          </Grid.Column>

          {this.state.stats === true ? (
            <Grid.Column width={8}>
              <h4>Stats</h4>
              <Segment id ="clue-box">
                {this.props.puzzleSolves.map(s => (
                  <p key={s.id}>{s.solver.name} - {this.formatTime(s.time)}</p>
                ))}
              </Segment>
            </Grid.Column>
          ) : (
            <Fragment>
              <Grid.Column>
                <h4>Across</h4>
                <Segment id ="clue-box">
                  { puzzle && puzzle.across_clues.sort((a,b) => a.number - b.number ).map(c => (
                    <p key={c && c.id}><span className="order-number">{c.number}</span> {c.content}</p>
                  ))}
                </Segment>
              </Grid.Column>

              <Grid.Column>
                <h4>Down</h4>
                <Segment id ="clue-box">
                  { puzzle && puzzle.down_clues.sort((a,b) => a.number - b.number ).map(c => (
                    <p key={c && c.id}><span className="order-number">{c.number}</span> {c.content}</p>
                  ))}
                </Segment>
              </Grid.Column>
            </Fragment>
          )
          }
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    puzzle: [...state.userPuzzles, ...state.solvedPuzzles].find(p => p.id === parseInt(ownProps.match.params.puzzleID)),
    user: state.currentUser,
    puzzleSolves: state.puzzleSolves,
    time: (state.currentUser.id && state.currentUser.id !==  [...state.userPuzzles, ...state.solvedPuzzles].find(p => p.id === parseInt(ownProps.match.params.puzzleID)).constructor.id ? state.solves.find(s => s.puzzle_id === parseInt(ownProps.match.params.puzzleID)).time : null)
  }
}

export default connect(mapStateToProps, { findSolveData, resetPuzzleSolves })(PuzzlePage)
