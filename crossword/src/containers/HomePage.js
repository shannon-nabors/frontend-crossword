import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class HomePage extends Component {

  render() {
    return(
      <Fragment>
        <p>hey</p>
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
