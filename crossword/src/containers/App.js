import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchingPuzzles } from '../redux/actions'
import '../App.css'
import PuzzlePage from './PuzzlePage'

class App extends Component {

  componentDidMount() {
    this.props.fetchingPuzzles()
  }

  render() {
    return (
      <div className="App">
        <PuzzlePage />
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
