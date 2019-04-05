import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setNewPuzzleSize } from '../redux/actions'

const sizeOptions = [
  {
    key: 15,
    text: '15 x 15',
    value: 15,
  },
  {
    key: 17,
    text: '17 x 17',
    value: 17,
  },
  {
    key: 19,
    text: '19 x 19',
    value: 19,
  },
  {
    key: 21,
    text: '21 x 21',
    value: 21,
  },
  {
    key: 23,
    text: '23 x 23',
    value: 23,
  }
]

class GridSizeDropdown extends Component {

  handleChange = (e, {value}) => this.props.setNewPuzzleSize(value)

  render() {
    return(
      <Dropdown
        onChange={this.handleChange}
        placeholder='Select Grid Size'
        selection
        options={sizeOptions}
        value={this.props.newPuzzle.size}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newPuzzle: state.newPuzzle
  }
}

export default connect(mapStateToProps, { setNewPuzzleSize })(GridSizeDropdown)
