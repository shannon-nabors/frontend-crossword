import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { formatTime } from '../redux/constants'
import Puzzle from './Puzzle'

class PuzzleCard extends Component {

  generateRoute = () => {
    let { puzzle, userPuzzles, solvedPuzzles, savedPuzzles } = this.props
    if (userPuzzles.includes(puzzle) || solvedPuzzles.includes(puzzle)) { 
      return `/puzzles/${puzzle.id}`
    } else if (savedPuzzles.includes(puzzle)) {
      return `/saved/${puzzle.id}`
    } else {
      return `/solve/${puzzle.id}`
    }
  }

  render() {
    let { puzzle } = this.props

    return(
      <NavLink to={this.generateRoute()} className="ui card" id="puz-card">
        <div className="image">
          <Puzzle
            puzzle={puzzle}
          />
        </div>
        <div className="content">
          <p className="header" id="puz-card-title">{puzzle.title}</p>
          <p className="meta">by {`${puzzle.constructor.first_name} ${puzzle.constructor.last_name}`}</p>
        </div>
        <div className="extra content" id="extra-card-content">
          <span>Average: {formatTime(puzzle.average)}</span>
          <span className="ui right floated"><Icon color="red" name="heart"/> {puzzle.favorites}</span>
        </div>
      </NavLink>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userPuzzles: state.userPuzzles,
    solvedPuzzles: state.solvedPuzzles,
    savedPuzzles: state.savedPuzzles
  }
}

export default connect(mapStateToProps)(PuzzleCard)
