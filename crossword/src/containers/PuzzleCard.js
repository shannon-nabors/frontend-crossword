import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Puzzle from './Puzzle'

class PuzzleCard extends Component {
  render() {
    return(
      <NavLink to={`/solve/${this.props.puzzle.id}`} className="ui card">
        <div className="image">
          <Puzzle
            puzzle={this.props.puzzle}
          />
        </div>
        <div className="content">
          <p className="header">{this.props.puzzle.title}</p>
        </div>
        <div className="extra content">
          <p>{this.props.puzzle.constructor.name}</p>
        </div>
      </NavLink>
    )
  }
}

export default PuzzleCard
