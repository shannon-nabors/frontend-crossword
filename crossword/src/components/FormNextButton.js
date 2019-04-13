import React, { Component, Fragment } from 'react'
import { Button, Icon, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setFormStage,
         postingPuzzle,
         updatingPuzzle } from '../redux/actions/createPuzzle'

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
        this.props.updatingPuzzle("setup")
        this.props.setFormStage("enter")
        break
      default:
        return
    }
  }

  render() {
    return(
      <Fragment>
        {this.state.failed && (
          <Message
            error
            content="Please choose a size"
          />
        )}
        <Button
          icon
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
    cells: state.newPuzzle.cells
  }
}

export default connect(mapStateToProps, { setFormStage, postingPuzzle, updatingPuzzle })(NextButton)
