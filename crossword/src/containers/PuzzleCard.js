import React, { Component } from 'react'
import Puzzle from './Puzzle'

class PuzzleCard extends Component {
  render() {
    return(
      <div className="ui card">
        <div className="image">
          <Puzzle puzzle={this.props.puzzle}/>
        </div>
        <div className="content">
          <a className="header">{this.props.puzzle.title}</a>
        </div>
        <div className="extra content">
          <a>{this.props.puzzle.constructor.name}</a>
        </div>
      </div>
    )
  }
}

export default PuzzleCard
