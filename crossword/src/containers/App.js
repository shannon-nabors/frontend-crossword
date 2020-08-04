import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
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
import { logInUser } from '../redux/actions/manageUsers'

class App extends Component {

  componentDidMount() {
    let token = localStorage.getItem('crossPostJWT')
    if (token) {
      fetch('http://localhost:3000/verify', {
        method: "GET",
        headers: {
          Authentication: token
        }
      }).then(r => r.json())
      .then(user => this.props.logInUser(user))
    }
  }

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
            path="/puzzles/:puzzleID/solve"
            component={SolvePage}
          />
          <Route
            path="/puzzles/:puzzleID/edit"
            component={SavedPage}
          />
          <Route
            path="/puzzles/:puzzleID"
            component={PuzzlePage}
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
            render={() => this.props.loggedIn ? <Form/> : <Login/>}
          />
          <Route
            exact path="/signup"
            component={SignUp}
          />
          <Route
            path="/"
            // component={Login}
            render={() => this.props.loggedIn ? <Redirect to="/home"/> : <Login/>}
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

export default connect(mapStateToProps, { logInUser })(App)
