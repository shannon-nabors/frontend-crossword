import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setFormStage, postingPuzzle, assignNumbers } from '../redux/actions'

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
        this.getNumbers()
        this.props.setFormStage("enter")
        break
      default:
        return
    }
  }

  getNumbers() {
    let num = 1

    let nc = this.props.cells.map(c => {
      let leftNeighbor = this.props.cells.find(cell => cell.row === c.row && cell.column === c.column - 1)

      let topNeighbor = this.props.cells.find(cell => cell.column === c.column && cell.row === c.row - 1)

      if ((c.shaded === false) && ((c.row === 1 || c.column === 1) || (leftNeighbor && leftNeighbor.shaded === true) || (topNeighbor && topNeighbor.shaded === true))) {
        c.number = num
        num ++
      }

    })
    console.log(nc)
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

export default connect(mapStateToProps, { setFormStage, postingPuzzle, assignNumbers })(NextButton)
