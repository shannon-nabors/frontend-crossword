import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Dimmer, Loader } from 'semantic-ui-react'
import PuzzleContainer from './PuzzleContainer'

class HomePage extends Component {

  render() {
    return(
      <Fragment>
        <PuzzleContainer
          puzzles={ this.props.puzzles }
        />

        <Dimmer active={this.props.loading ? true : false}>
          <Loader size='large'>Loading puzzles</Loader>
        </Dimmer>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    puzzles: state.unsolvedPuzzles,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(HomePage)
