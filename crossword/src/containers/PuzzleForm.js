import React, { Component, Fragment } from 'react'
import SizePage from './FormSizePage'
import ShadePage from './FormShadePage'
import { connect } from 'react-redux'
import { setFormStage } from '../redux/actions'

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
