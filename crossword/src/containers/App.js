import React, { Component } from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import '../App.css'
import Navbar from './Navbar'
import Login from '../components/LoginPage'
import SignUp from '../components/SignupPage'
import HomePage from './HomePage'
import SolveMenu from './SolveMenu'
import PuzzlePage from './PuzzlePage'
import SolvePage from './SolvePage'
import SavedPage from './SavedPage'
import PrintPage from './PrintPage'
import PrintData from './PrintData'
import Leaderboard from './Leaderboard'
import CurrentUserPage from './CurrentUserPage'
import Form from './PuzzleForm'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar />

        <div id="pages">
        <Switch>
          <Route
            path="/puzzles/:puzzleID/print"
            component={PrintPage}
          />
          <Route
            path="/puzzles/:puzzleID/printdata"
            component={PrintData}
          />
          <Route
            path="/puzzles/:puzzleID"
            component={PuzzlePage}
          />
          <Route
            path="/solve/:puzzleID"
            component={SolvePage}
          />
          <Route
            path="/saved/:puzzleID"
            component={SavedPage}
          />
          <Route
            path="/solve"
            component={SolveMenu}
          />
          <Route
            exact path="/profile"
            component={CurrentUserPage}
          />
          <Route
            exact path="/home"
            component={HomePage}
          />
          <Route
            exact path="/leaderboard"
            component={Leaderboard}
          />
          <Route
            exact path="/create"
            component={Form}
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps)(App)
