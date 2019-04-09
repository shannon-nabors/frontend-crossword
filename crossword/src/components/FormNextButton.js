import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setFormStage, postingPuzzle, preparingPuzzle } from '../redux/actions'

class NextButton extends Component {

  handleClick = () => {
    console.log(this.props.size)
    switch (this.props.stage) {
      case "size":
        this.props.postingPuzzle()
        this.props.setFormStage("shade")
        break
      case "shade":
        this.props.preparingPuzzle()
        this.props.setFormStage("enter")
        break
      default:
        return
    }
  }

  render() {
    return(
      <Button
        icon
        labelPosition='right'
        onClick={this.handleClick}>
        Next
        <Icon name='right arrow' />
      </Button>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stage: state.formStage,
    size: state.newPuzzle.size,
    cells: state.newPuzzle.cells
  }
}

export default connect(mapStateToProps, { setFormStage, postingPuzzle, preparingPuzzle })(NextButton)
