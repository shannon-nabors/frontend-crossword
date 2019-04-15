import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { formatTime } from '../redux/constants'
import Puzzle from './Puzzle'

class PuzzleCard extends Component {
  render() {
    let { puzzle, userPuzzles, solvedPuzzles } = this.props

    return(
      <NavLink to={ userPuzzles.includes(puzzle) || solvedPuzzles.includes(puzzle) ? `/puzzles/${puzzle.id}` : `/solve/${puzzle.id}`} className="ui card">
        <div className="image">
          <Puzzle
            puzzle={puzzle}
          />
        </div>
        <div className="content">
          <p className="header">{puzzle.title}</p>
          <p className="meta">by {`${puzzle.constructor.first_name} ${puzzle.constructor.last_name}`}</p>
        </div>
        <div className="extra content">
          Average time: {formatTime(puzzle.average)}
        </div>
      </NavLink>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userPuzzles: state.userPuzzles,
    solvedPuzzles: state.solvedPuzzles
  }
}

export default connect(mapStateToProps)(PuzzleCard)
