import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { <action name> } from <action file path>
import '../App.css'

import Puzzle from './Puzzle'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Puzzle />
      </div>
    )
  }
}

const mapStateToProps = state => ({
 ...state
})

// const mapDispatchToProps = dispatch => ({
//  <action name>: () => dispatch(<action function>)
// })

export default connect(mapStateToProps)(App)
