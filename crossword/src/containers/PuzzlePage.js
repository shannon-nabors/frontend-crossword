import React, { Component, Fragment } from 'react'
import { Grid, Segment, Icon,
         Container, Header, Button,
         Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { findSolveData,
         resetPuzzleSolves,
         addFavorite,
         deleteFavorite,
         getFavorites } from '../redux/actions/stats'
import { deselectCell, selectCell, 
         selectClue } from '../redux/actions/puzzleInteraction.js'
import { fetchingPuzzle } from '../redux/actions/changePuzzles.js'
import { formatTime } from '../redux/constants'
import { findWord } from '../helpers/typingHelpers'
import { isEmpty } from 'lodash'
import Puzzle from './Puzzle'
import DeleteButton from '../components/DeletePuzzleButton'

class PuzzlePage extends Component {

  state = {
    menu: "Clues",
    imageUrl: ""
  }

  handleMenuClick = (e, { name }) => {
    this.setState({ menu: name })
  }

  componentDidMount() {
    this.props.fetchingPuzzle(this.props.match.params.puzzleID)
    this.props.deselectCell()
    if (this.props.puzzle) {
      this.props.findSolveData("puzzle", this.props.puzzle.id)
      this.props.getFavorites("puzzle", this.props.puzzle.id)
    }
  }

  componentWillUnmount() {
    this.props.resetPuzzleSolves()
    this.props.deselectCell()
  }

  belongsToCurrentUser() {
    let { puzzle, user } = this.props
    return (puzzle && user.id && user.id === puzzle.constructor.id)
  }

  favorited() {
    let { puzzle, userFavorites } = this.props
    return (userFavorites.find(f => f.puzzle_id === puzzle.id))
  }

  handleFavClick = () => {
    if (this.favorited()) {
      this.props.deleteFavorite(this.props.puzzle.id)
    } else {
      this.props.addFavorite(this.props.puzzle.id)
    }
  }

  handleClueClick = (clue) => {
    let cluesFirstCell = this.props.puzzle.cells.find(cell => cell.number === clue.number)
    this.props.selectClue(clue)
    this.props.selectCell(cluesFirstCell, findWord(cluesFirstCell, this.props.puzzle.cells, clue.direction))
  }

  componentDidUpdate(prevProps) {
    // scroll to clue if active clue changed in state
    if(prevProps.clue !== this.props.clue) {
      let clueElement = document.getElementById(`clue-${this.props.clue.id}`)
      clueElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  render() {
    let { puzzle, user } = this.props
    if (isEmpty(puzzle)) { return null }
    // let puzElement = document.querySelector("#puz")

    return (
      <Container>
        <Grid columns={4}>
          <Grid.Column width={8}>
            <Container id="puz-sizer">
                <Header as="h2" id="puz-title">{puzzle && puzzle.title}
                  { this.belongsToCurrentUser() ?
                    <Button.Group floated="right">
                      <Button 
                        icon color="black"
                        as={ Link }
                        to={`${this.props.puzzle.id}/edit`}
                        >
                        <Icon name="pencil"></Icon>
                      </Button>
                      <DeleteButton
                        puzzle={this.props.puzzle}
                      />
                      <Button 
                        icon color="black"
                        as={ Link }
                        to={`${this.props.puzzle.id}/printdata`}
                        >
                        <Icon name="print"></Icon>
                      </Button>
                    </Button.Group>
                    : null }
                </Header>
              {this.belongsToCurrentUser() || isEmpty(user) ? (
                <Fragment>
                  <div id="puz-author"><Icon color="red" name="heart"/>{puzzle.total_favs} {puzzle.total_favs === 1 ? "favorite" : "favorites"}</div>
                </Fragment>
              ) : (
                <div className="puz-header">
                  <Header as="h4" id="puz-author">by {puzzle && `${puzzle.constructor.first_name} ${puzzle.constructor.last_name}`}</Header>
                  <span>
                    <span id="solved-bar">
                      <Icon color="yellow" name="star"/>
                      <span id="solved-tag">You solved in {formatTime(this.props.time)}</span>
                    </span>
                    <Button color="black" id="fav-bar" onClick={this.handleFavClick}><Icon color="red" name={this.favorited() ? "heart" : "heart outline"}/>{puzzle.total_favs} {puzzle.total_favs === 1 ? "favorite" : "favorites"}</Button>
                  </span>
                </div>
              )}
              <Puzzle
                puzzle={puzzle}
                answers="true"
                cursorClass="normal-cursor"
              />
            </Container>
          </Grid.Column>

          <Grid.Column width={8}>
            <Menu id="tab-menu" attached='top' tabular>
              <Menu.Item
                name='Clues'
                active={this.state.menu === "Clues"}
                onClick={this.handleMenuClick}
              />
              <Menu.Item
                name='Stats'
                active={this.state.menu === "Stats"}
                onClick={this.handleMenuClick}
              />
            </Menu>
            <Segment
              attached="bottom"
            >
              {this.state.menu === "Stats" && (
                <Fragment>
                  <Segment id="clue-box">
                    {this.props.puzzleSolves.map((s,i) => (
                      <p key={s.id}><span className="order-number">{i+1}</span>
                      {formatTime(s.time)} ({s.solver.name} on {s.created_at.slice(0,10)})</p>
                      )
                    )}
                    <h5>The average solve time for this puzzle is  {formatTime(puzzle.average)}.</h5>
                  </Segment>
                </Fragment>
              )}
              {this.state.menu === "Clues" && (
                <Fragment>
                  <Grid>
                  <Grid.Column width={8}>
                    <h4>Across</h4>
                    <Segment id ="clue-box">
                      { puzzle && puzzle.across_clues.sort((a,b) => a.number - b.number ).map(c => (
                        <p key={c && c.id}
                           id={`clue-${c.id}`}
                           style={{backgroundColor: this.props.clue && this.props.clue.id === c.id ? "#FFC368" : "#FFFFFF"}}
                           onClick={() => this.handleClueClick(c)}>
                          <span className="clue-number">{c.number}</span>
                          {c.content}
                        </p>
                      ))}
                    </Segment>
                  </Grid.Column>

                  <Grid.Column width={8}>
                    <h4>Down</h4>
                    <Segment id ="clue-box">
                      { puzzle && puzzle.down_clues.sort((a,b) => a.number - b.number ).map(c => (
                        <p key={c && c.id}
                           id={`clue-${c.id}`}
                           style={{backgroundColor: this.props.clue && this.props.clue.id === c.id ? "#FFC368" : "#FFFFFF"}}
                           onClick={() => this.handleClueClick(c)}>
                          <span className="clue-number">{c.number}</span>
                          {c.content}
                        </p>
                      ))}
                    </Segment>
                  </Grid.Column>
                  </Grid>
                </Fragment>
              )}
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // debugger
  return {
    // puzzle: [...state.userPuzzles, ...state.solvedPuzzles].find(p => p.id === parseInt(ownProps.match.params.puzzleID)),
    puzzle: state.currentPuzzle,
    user: state.currentUser,
    puzzleSolves: state.puzzleSolves,
    userFavorites: state.userFavorites,
    favorites: state.puzzleFavorites,
    clue: state.selectedClue,
    // time: (state.currentUser.id && state.currentUser.id !==  [...state.userPuzzles, ...state.solvedPuzzles].find(p => p.id === parseInt(ownProps.match.params.puzzleID)).constructor.id ? state.solves.find(s => s.puzzle_id === parseInt(ownProps.match.params.puzzleID)).time : null)
    time: (state.currentUser.id && state.currentPuzzle.constructor_id && state.currentPuzzle.constructor_id !== state.currentUser.id ? state.solves.find(s => s.puzzle_id === parseInt(ownProps.match.params.puzzleID)).time : null)
  }
}

export default connect(mapStateToProps, { findSolveData, deselectCell,
                                          resetPuzzleSolves, addFavorite,
                                          deleteFavorite, getFavorites,
                                          selectCell, selectClue, fetchingPuzzle })(PuzzlePage)
