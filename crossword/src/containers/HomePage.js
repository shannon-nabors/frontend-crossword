import React, { Component, Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import HomeLogo from '../components/HomeLogo'

class HomePage extends Component {

  render() {
    return(
      <Fragment>
        <Container id="logo-sizer">
          <HomeLogo viewBox="0 0 144 52"/>
        </Container>
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
