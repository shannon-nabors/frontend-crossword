import React, { Component, Fragment } from 'react'
import { Container, Grid, Icon, Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchingGuestPuzzles } from '../redux/actions/changePuzzles'
import WelcomeLogo from '../components/WelcomeLogo'

class HomePage extends Component {

  render() {
    let { user } = this.props

    return(
      <Fragment>
        <Container id="welcome">
          <WelcomeLogo />
        </Container>
        <br/>

        <br/>

        <Container>
          <Grid columns={3}>
            <Grid.Column>
              <Container as={ Link } to="/create" className="home-card">
                <h2>CREATE</h2>
                Have a crossword you've written?  Want to share it with your friends?  Enter and host your puzzle here so others on the site can solve it!
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Container as={ Link } to="/profile" className="home-card" id="middle-card">
                <h1>Hi {user.first_name}!</h1>
                See your published and solved puzzles on your profile.
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Container as={ Link } to="/solve" className="home-card">
                <h2>SOLVE</h2>
                Solve crossword puzzles that have been created by other users on the site, and choose your favorites to recommend to other solvers.
              </Container>
            </Grid.Column>
          </Grid>
        </Container>
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

//
// <Card
//   as={ Link }
//   to="/leaderboard"
// >
//   <Card.Content textAlign="center">
//   <Icon name="chart bar" color="black" size="massive"></Icon>
//   </Card.Content>
//   <Card.Content>
//     <Card.Header textAlign="center">LEADERBOARD</Card.Header>
//     <Card.Description>See solving statistics for users across the site.</Card.Description>
//   </Card.Content>
// </Card>
