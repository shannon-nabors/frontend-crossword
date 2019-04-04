import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Puzzle from './Puzzle'
import { settingKey } from '../redux/actions'

class SolvePage extends Component {
  constructor() {
    super()
    this.state = {key: null}
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
  }

  handleKeyPress = (event) => {
    this.props.settingKey(event.key)
  }

  render() {
    return (
      <Fragment>
        <h2>{this.props.puzzle && this.props.puzzle.title}</h2>
        <div className="ui container" id="puz-sizer">
          <Puzzle
            puzzle={this.props.puzzle}

            editable="true"
          />
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    puzzle: state.puzzles.find(p => p.id === parseInt(ownProps.match.params.puzzleID))
  }
}

export default connect(mapStateToProps, { settingKey })(SolvePage)
