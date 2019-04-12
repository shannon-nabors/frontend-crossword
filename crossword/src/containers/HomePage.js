import React, { Component, Fragment } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import WelcomeLogo from '../components/WelcomeLogo'

class HomePage extends Component {

  render() {
    return(
      <Fragment>
        <Container id="welcome">
          <WelcomeLogo />
        </Container>
        <Grid stackable columns={2} celled="internally">
          <Grid.Column>
            <p>Create</p>
          </Grid.Column>
          <Grid.Column>
            <p>Solve</p>
          </Grid.Column>
          <Grid.Column>
            <p>Blah</p>
          </Grid.Column>
          <Grid.Column>
            <p>Blah</p>
          </Grid.Column>
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    puzzles: state.unsolvedPuzzles
  }
}

export default connect(mapStateToProps)(HomePage)
// <HomeLogo viewBox="0 0 144 52"/>
