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
        // this.props.assignNumbers(this.getNumbers())
        // this.getNumbers()
        this.props.preparingPuzzle()
        this.props.setFormStage("enter")
        break
      default:
        return
    }
  }

  // I think this is bad because I'm directly altering state....will fix later
  // getNumbers() {
  //   let num = 1
  //   let clues = []
  //
  //   let nc = this.props.cells.sort((a,b) => a.id - b.id).map(c => {
  //     let leftNeighbor = this.props.cells.find(cell => cell.row === c.row && cell.column === c.column - 1)
  //
  //     let topNeighbor = this.props.cells.find(cell => cell.column === c.column && cell.row === c.row - 1)
  //
  //     if ((c.shaded === false) && ((c.row === 1 || c.column === 1) || (leftNeighbor && leftNeighbor.shaded === true) || (topNeighbor && topNeighbor.shaded === true))) {
  //       if (c.column === 1 || (leftNeighbor && leftNeighbor.shaded === true)) {
  //         clues.push({ number: num, direction: "across" })
  //       }
  //
  //       if (c.row === 1 || (topNeighbor && topNeighbor.shaded === true)) {
  //         clues.push({ number: num, direction: "down" })
  //       }
  //
  //       c.number = num
  //       num ++
  //     }
  //
  //   })
  // }

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
