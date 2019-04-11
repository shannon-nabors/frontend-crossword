import React, { Component, Fragment } from 'react'
import SizePage from './FormSizePage'
import ShadePage from './FormShadePage'
import EnterPage from './FormEnterPage'
import { connect } from 'react-redux'
import { setFormStage } from '../redux/actions/createPuzzle'

class PuzzleForm extends Component {

  componentDidMount() {
    this.props.setFormStage("size")
  }

  render() {
    return(
      <Fragment>
        {this.props.stage === "size" && (
          <SizePage/>
        )}

        {this.props.stage === "shade" && (
          <ShadePage/>
        )}

        {this.props.stage === "enter" && (
          <EnterPage/>
        )}

      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stage: state.formStage
  }
}

export default connect(mapStateToProps, { setFormStage })(PuzzleForm)
