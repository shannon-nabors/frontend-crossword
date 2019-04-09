import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { URL } from '../redux/actions'

class DeleteButton extends Component {

  handleClick = () => {
    fetch(`${URL}/${this.props.puzzle.id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })
  }

  render() {
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

export default DeleteButton
