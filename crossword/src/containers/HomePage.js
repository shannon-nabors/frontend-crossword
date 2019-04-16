import React, { Component, Fragment } from 'react'
import { Container, Card, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchingGuestPuzzles } from '../redux/actions/changePuzzles'
import WelcomeLogo from '../components/WelcomeLogo'

class HomePage extends Component {

  render() {
    return(
      <Fragment>
        <Container id="welcome">
          <WelcomeLogo />
        </Container>
        <br/>

        <br/>
        <Card.Group centered>
          <Card
            as={ Link }
            to={ this.props.user.name ? "/create" : "/home"}
          >
            <Card.Content textAlign="center">
            <Icon name="lightbulb" color="black" size="massive"></Icon>
            </Card.Content>
            <Card.Content>
              <Card.Header textAlign="center">CREATE A PUZZLE</Card.Header>
              <Card.Description>Have a crossword you've written?  Want to share it with your friends?  Enter and host your puzzle here so others on the site can solve it!</Card.Description>
            </Card.Content>
          </Card>
          <Card
            as={ Link }
            to="/solve"
          >
            <Card.Content textAlign="center">
            <Icon name="pencil" color="black" size="massive"></Icon>
            </Card.Content>
            <Card.Content>
              <Card.Header textAlign="center">SOLVE PUZZLES</Card.Header>
              <Card.Description>Solve crossword puzzles that have been created by other users on the site.</Card.Description>
            </Card.Content>
          </Card>
          <Card
            as={ Link }
            to="/leaderboard"
          >
            <Card.Content textAlign="center">
            <Icon name="chart bar" color="black" size="massive"></Icon>
            </Card.Content>
            <Card.Content>
              <Card.Header textAlign="center">LEADERBOARD</Card.Header>
              <Card.Description>See solving statistics for users across the site.</Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.currentUser,
    puzzles: state.unsolvedPuzzles
  }
}

export default connect(mapStateToProps, { fetchingGuestPuzzles })(HomePage)
