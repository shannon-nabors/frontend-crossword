import React, { Component, Fragment } from 'react'
import { Grid, Segment, Icon,
         Container, Header, Button,
         Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { findSolveData,
         resetPuzzleSolves,
         addFavorite,
         deleteFavorite,
         getFavorites } from '../redux/actions/stats'
import { formatTime } from '../redux/constants'
import Puzzle from './Puzzle'
import DeleteButton from '../components/DeletePuzzleButton'

class PuzzlePage extends Component {

  state = {
    menu: "Clues"
  }

  handleMenuClick = (e, { name }) => {
    this.setState({ menu: name })
  }

  componentDidMount() {
    if (this.props.puzzle) {
      this.props.findSolveData("puzzle", this.props.puzzle.id)
      this.props.getFavorites("puzzle", this.props.puzzle.id)
    }
  }

  componentWillUnmount() {
    this.props.resetPuzzleSolves()
  }

  belongsToCurrentUser() {
    let { puzzle, user } = this.props
    return (puzzle && user.id && user.id === puzzle.constructor.id) ? true : false
  }

  favorited() {
    let { puzzle, userFavorites } = this.props
    return (userFavorites.find(f => f.puzzle_id === puzzle.id)) ? true : false
  }

  handleFavClick = () => {
    if (this.favorited()) {
      this.props.deleteFavorite(this.props.puzzle.id)
    } else {
      this.props.addFavorite(this.props.puzzle.id)
    }
  }

  render() {
    let { puzzle } = this.props

    return (
      <Container>
        <Grid columns={4}>
          <Grid.Column width={8}>
            <Container id="puz-sizer">
                <Header as="h2" id="puz-title">{puzzle && puzzle.title}
                  { this.belongsToCurrentUser() ?
                    <DeleteButton buttonType="delete-completed-puzzle" puzzle={puzzle}/>
                    : null }
                </Header>
              {this.belongsToCurrentUser() ? (
                <Fragment>
                  <div id="puz-author"><Icon color="red" name="heart"/>{this.props.favorites.length} favorites</div>
                </Fragment>
              ) : (
                <div className="puz-header">
                  <Header as="h4" id="puz-author">by {puzzle && `${puzzle.constructor.first_name} ${puzzle.constructor.last_name}`}</Header>
                  <span>
                    <span id="solved-bar">
                      <Icon color="yellow" name="star"/>
                      <span id="solved-tag">You solved in {formatTime(this.props.time)}</span>
                    </span>
                    {this.favorited() ? (
                      <Button color="black" id="fav-bar" onClick={this.handleFavClick}><Icon color="red" name="heart"/>{this.props.favorites.length} {this.props.favorites.length === 1 ? "favorite" : "favorites"}</Button>
                    ) : (
                      <Button color="black" id="fav-bar" onClick={this.handleFavClick}><Icon color="red" name="heart outline"/>{this.props.favorites.length} {this.props.favorites.length === 1 ? "favorite" : "favorites"}</Button>
                    )}
                  </span>
                </div>
              )}
              <Puzzle
                puzzle={puzzle}
                answers="true"
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
  return {
    puzzle: [...state.userPuzzles, ...state.solvedPuzzles].find(p => p.id === parseInt(ownProps.match.params.puzzleID)),
    user: state.currentUser,
    puzzleSolves: state.puzzleSolves,
    userFavorites: state.userFavorites,
    favorites: state.puzzleFavorites,
    time: (state.currentUser.id && state.currentUser.id !==  [...state.userPuzzles, ...state.solvedPuzzles].find(p => p.id === parseInt(ownProps.match.params.puzzleID)).constructor.id ? state.solves.find(s => s.puzzle_id === parseInt(ownProps.match.params.puzzleID)).time : null)
  }
}

export default connect(mapStateToProps, { findSolveData, resetPuzzleSolves, addFavorite, deleteFavorite, getFavorites })(PuzzlePage)
