import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { changeGameStatus } from '../redux/actions/solvePuzzle'

class ResultsModal extends React.Component {

  handleExitClick(e) {
    let modal = document.querySelector('#results-modal')
    if ((e.target !== modal && ![...modal.querySelectorAll('*')].includes(e.target)) || e.target === document.querySelector('#exit-icon')) {
      this.props.gameStatus === "won" ? this.props.changeGameStatus("review") : this.props.changeGameStatus("in progress")
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
            {this.props.gameStatus === "won" ? "Congratulations!" : "Hmm..."}
          </div>

          <div className="ui centered description">
            <br/>
            <br/>
            <br/>
            {this.props.gameStatus === "won" ? "You completed this puzzle!" : "The puzzle is filled, but something's not quite right.  Keep trying!"}
          </div>

        </div>
      </div>,
      document.body
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    gameStatus: state.gameStatus
  }
}

export default connect(mapStateToProps, { changeGameStatus })(ResultsModal)
