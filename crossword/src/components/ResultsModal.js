import React from 'react'
import ReactDOM from 'react-dom'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { changeGameStatus, handleTimer } from '../redux/actions/solvePuzzle'

class ResultsModal extends React.Component {

  componentDidMount() {
    this.props.handleTimer()
  }

  // componentWillUnmount() {
  //   this.props.handleTimer()
  // }

  handleExitClick(e) {
    let modal = document.querySelector('#results-modal')
    if ((e.target !== modal && ![...modal.querySelectorAll('*')].includes(e.target)) || e.target === document.querySelector('#exit-icon')) {
      this.props.gameStatus === "won" ? this.props.changeGameStatus("review") : this.props.changeGameStatus("in progress")
      this.props.gameStatus === "completed incorrectly" && this.props.time()
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

          <br/>
          <br/>
          <div className="ui description">
            {this.props.gameStatus === "won" ? (
              <div>You solved this puzzle in {this.props.time}!<br/><br/><Icon color="yellow" size="huge" name="star"/></div>
            ) : "The puzzle is filled, but something's not quite right.  Keep trying!"}
            {/* {!this.props.user && this.props.gameStatus === "won"? (
              <p id="results-tag">Want to save your results? <a href="/signup">Create an account!</a></p>) : null} */}
          </div>

        </div>
      </div>,
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

export default connect(mapStateToProps, { changeGameStatus, handleTimer })(ResultsModal)
