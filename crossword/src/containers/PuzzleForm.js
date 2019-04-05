import React, { Component } from 'react'
import GridSizer from '../components/GridSizeDropdown'
import { connect } from 'react-redux'
import { setFormStage } from '../redux/actions'

class PuzzleForm extends Component {

  componentDidMount() {
    this.props.setFormStage("size")
  }

  render() {
    return(
      <div></div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stage: state.formStage
  }
}

export default connect(mapStateToProps, { setFormStage })(PuzzleForm)
