import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { handleTimer } from '../redux/actions/solvePuzzle'

class PauseModal extends React.Component {

  handleExitClick(e) {
    let modal = document.querySelector('#pause-modal')
    if ((e.target !== modal && ![...modal.querySelectorAll('*')].includes(e.target)) || e.target === document.querySelector('#resume-button')) {
      this.props.exit()
    }
  }

  render() {

    return ReactDOM.createPortal(
      <Modal
        onClick={(e) => this.handleExitClick(e)}
        id="pause-modal"
        dimmer="blurring"
        open>
        <Modal.Content>
          <div className="ui description">
            Your game has been paused.
          </div>

          <Button
            id="resume-button"
            color="black">Resume
          </Button>
        </Modal.Content>
      </Modal>,
      document.body
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    gameStatus: state.gameStatus,
    user: state.currentUser
  }
}

export default connect(mapStateToProps, { handleTimer })(PauseModal)
