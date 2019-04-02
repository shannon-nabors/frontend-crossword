import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import { fetchingPuzzles } from '../redux/actions'
import '../App.css'
import PuzzleContainer from './PuzzleContainer'
import PuzzlePage from './PuzzlePage'

class App extends Component {

  componentDidMount() {
    this.props.fetchingPuzzles()
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
          path="/puzzles/:puzzleID"
          component={PuzzlePage}
          />
          <Route
            path="/puzzles"
            component={PuzzleContainer}
          />
        </Switch>
      </div>
    )
  }

}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => {
  return {
    fetchingPuzzles : ()=>{dispatch(fetchingPuzzles())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
