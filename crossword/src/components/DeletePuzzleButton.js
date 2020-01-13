import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { URL } from '../redux/constants'
import { deletedUserPuzzle, deletedSavedPuzzle } from '../redux/actions/changePuzzles'

class DeleteButton extends Component {
  state = {
    redirect: false
  }

  handleClick = () => {
    fetch(`${URL}/puzzles/${this.props.puzzle.id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })
    // this.setState({ redirect: true })
    if (this.props.saved) {
      this.props.deletedSavedPuzzle(this.props.puzzle)
    } else {
      this.props.deletedUserPuzzle(this.props.puzzle)
    }
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/profile"/>
    }

    return(
      <Button
        icon
        as={ Link }
        to="/profile"
        color="black"
        floated="right"
        // labelPosition='right'
        // className="delete-button"
        id={this.props.buttonType}
        onClick={this.handleClick}
      >
        <Icon name='trash' />
      </Button>
    )
  }
}

export default connect(null, { deletedUserPuzzle, deletedSavedPuzzle })(DeleteButton)
