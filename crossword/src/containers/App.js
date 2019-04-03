import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import { fetchingPuzzles } from '../redux/actions'
import '../App.css'
import Navbar from './Navbar'
import Login from '../components/LoginPage'
import SignUp from '../components/SignupPage'
import HomePage from './HomePage'
import PuzzlePage from './PuzzlePage'
import SolvePage from './SolvePage'
import GridSizer from '../components/GridSizeDropdown'

class App extends Component {

  componentDidMount() {
    this.props.fetchingPuzzles()
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route
            path="/puzzles/:puzzleID"
            component={PuzzlePage}
          />
          <Route
            path="/solve/:puzzleID"
            component={SolvePage}
          />
          <Route
            exact path="/home"
            component={HomePage}
          />
          <Route
            exact path="/new"
            component={GridSizer}
          />
          <Route
            exact path="/signup"
            component={SignUp}
          />
          <Route
            path="/"
            component={Login}
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
