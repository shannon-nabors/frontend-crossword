import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Puzzle from './Puzzle'

class PuzzleCard extends Component {
  render() {
    let { puzzle, currentUser } = this.props

    return(
      <NavLink to={puzzle.constructor.id === currentUser.id ? `/puzzles/${puzzle.id}` : `/solve/${puzzle.id}`} className="ui card">
        <div className="image">
          <Puzzle
            puzzle={puzzle}
          />
        </div>
        <div className="content">
          <p className="header">{puzzle.title}</p>
        </div>
        <div className="extra content">
          <p>{puzzle.constructor.name}</p>
        </div>
      </NavLink>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(PuzzleCard)
