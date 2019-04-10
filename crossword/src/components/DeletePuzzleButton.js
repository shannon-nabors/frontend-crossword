import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { URL, deletedPuzzle } from '../redux/actions'

class DeleteButton extends Component {
  state = {
    redirect: false
  }

  handleClick = () => {
    fetch(`${URL}/${this.props.puzzle.id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })
    this.props.deletedPuzzle(this.props.puzzle)
    this.setState({ redirect: true })
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/home"/>
    }

    return(
      <Button
        icon
        labelPosition='right'
        onClick={this.handleClick}>
        Delete
        <Icon name='right arrow' />
      </Button>
    )
  }
}

export default connect(null, { deletedPuzzle })(DeleteButton)
