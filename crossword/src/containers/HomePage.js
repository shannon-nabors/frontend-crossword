import React, { Component, Fragment } from 'react'
import { Container, Grid, Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
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
            <Image id="card-image" src="https://media2.fdncms.com/chicago/imager/the-puzzler-and-the-puzzled/u/mobilestory/5932280/crossword-magnum.jpg"></Image>
            <Card.Content>
              <Card.Header textAlign="center">CREATE A PUZZLE</Card.Header>
              <Card.Description>Have a crossword you've written?  Want to share it with your friends?  Enter and host your puzzle here so others on the site can solve it!</Card.Description>
            </Card.Content>
          </Card>
          <Card as={ Link } to="/solve">
            <Image id="card-image" src="http://www.teamqualitypro.com/wp-content/uploads/b-TeamQualityPro-TestingTypes-Crossword-Puzzle.jpg"></Image>
            <Card.Content>
              <Card.Header textAlign="center">SOLVE PUZZLES</Card.Header>
              <Card.Description>Solve crossword puzzles that have been created by other users on the site.</Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.currentUser
  }
}

export default connect(mapStateToProps)(HomePage)
// <HomeLogo viewBox="0 0 144 52"/>
