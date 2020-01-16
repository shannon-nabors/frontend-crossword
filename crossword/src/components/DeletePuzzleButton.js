import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { URL } from '../redux/constants'
import { deletedUserPuzzle, deletedSavedPuzzle } from '../redux/actions/changePuzzles'

class DeleteButton extends Component {

  handleClick = () => {
    fetch(`${URL}/puzzles/${this.props.puzzle.id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })
    if (this.props.saved) {
      this.props.deletedSavedPuzzle(this.props.puzzle)
    } else {
      this.props.deletedUserPuzzle(this.props.puzzle)
    }
  }

  render() {

    return(
      <Button
        icon
        as={ Link }
        to={{
          pathname: '/profile',
          state: {
            menu: (this.props.saved ? "Saved" : "Published")
          }
        }}
        color="black"
        floated="right"
        id={this.props.buttonType}
        onClick={this.handleClick}
      >
        <Icon name='trash' />
      </Button>
    )
  }
}

export default connect(null, { deletedUserPuzzle, deletedSavedPuzzle })(DeleteButton)
