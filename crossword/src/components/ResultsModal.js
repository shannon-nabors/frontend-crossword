import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { toggleGameStatus } from '../redux/actions/puzzleInteraction'

class ResultsModal extends React.Component {

  handleExitClick(e) {
    let modal = document.querySelector('#results-modal')
    if ((e.target !== modal && ![...modal.querySelectorAll('*')].includes(e.target)) || e.target === document.querySelector('#exit-icon')) {
      this.props.toggleGameStatus()
    }
  }

  render() {

    return ReactDOM.createPortal(
      <div
        className="ui dimmer modals page transition visible active"
        onClick={(e) => this.handleExitClick(e)}>
        <div
          className="ui standard test modal transition visible active"
          id="results-modal">

          <i className="close icon" id="exit-icon"></i>

          <div className="ui centered header">
            Congratulations!
          </div>

          <div className="ui centered description">
            <br/>
            <br/>
            <br/>
            You completed {this.props.puzzle ? `${this.props.puzzle.title}` : "this puzzle"}.
          </div>

        </div>
      </div>,
      document.body
    )
  }
}

export default connect(null, { toggleGameStatus })(ResultsModal)
