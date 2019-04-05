import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setFormStage, createNewPuzzleCells } from '../redux/actions'

class NextButton extends Component {

  handleClick = () => {
    console.log(this.props.size)
    switch (this.props.stage) {
      case "size":
        this.props.createNewPuzzleCells(this.createCells(this.props.size))
        this.props.setFormStage("shade")
        break
      case "shade":
        this.props.setFormStage("enter")
        break
      default:
        return
    }
  }

  createCells = (num) => {
    let cells = []
    for (let i = 1; i <= (num*num); i++) {
      cells.push({
        shaded: false,
        row: Math.ceil((i/num)),
        column: i % num === 0 ? num : i % num
      })
    }
    return cells
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
    size: state.newPuzzle.size
  }
}

export default connect(mapStateToProps, { setFormStage, createNewPuzzleCells })(NextButton)
