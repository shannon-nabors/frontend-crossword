import React, { Component, Fragment } from 'react'
import { Button, Icon, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { size, values } from 'lodash'
import { setFormStage,
         postingPuzzle,
         updatingPuzzle,
         setLetters } from '../redux/actions/createPuzzle'

class NextButton extends Component {
  state = {
    failed: false
  }

  handleClick = () => {
    switch (this.props.stage) {
      case "size":
        if (this.props.size) {
          this.props.postingPuzzle()
          this.props.setFormStage("shade")
        } else {
          this.setState({failed: true})
        }
        break
      case "shade":
        let letterCells = this.props.cells.filter(c => c.shaded === false)
        if (values(this.props.enteredLetters).includes(null)) {
          this.setState({failed: true})
        } else if (size(this.props.enteredLetters) !== letterCells.length) {
          this.setState({failed: true})
        } else {
          this.props.setLetters()
          this.props.updatingPuzzle("setup")
          this.props.setFormStage("enter")
        }
        break
      default:
        return
    }
  }

  render() {
    return(
      <Fragment>
        {this.state.failed && this.props.stage === "size" && (
          <Message
            error
            content="Please choose a size"
          />
        )}
        {this.state.failed && this.props.stage === "shade" && (
          <Message
            error
            content="Please fill the entire puzzle before moving on"
          />
        )}
        <Button
          icon
          color="black"
          labelPosition='right'
          onClick={this.handleClick}>
          Next
          <Icon name='right arrow' />
        </Button>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stage: state.formStage,
    size: state.newPuzzle.size,
    cells: state.newPuzzle.cells,
    enteredLetters: state.enteredLetters
  }
}

export default connect(mapStateToProps, { setFormStage, postingPuzzle, updatingPuzzle, setLetters })(NextButton)
