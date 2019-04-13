import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { URL } from '../redux/constants'
import { deletedPuzzle } from '../redux/actions/changePuzzles'

class DeleteButton extends Component {
  state = {
    redirect: false
  }

  handleClick = () => {
    fetch(`${URL}/puzzles/${this.props.puzzle.id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })
    this.props.deletedPuzzle(this.props.puzzle)
    this.setState({ redirect: true })
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/profile"/>
    }

    return(
      <Button
        icon
        labelPosition='right'
        id="delete-button"
        onClick={this.handleClick}>
        Delete this puzzle
        <Icon name='trash' />
      </Button>
    )
  }
}

export default connect(null, { deletedPuzzle })(DeleteButton)
