import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

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
  render() {
    return(
      <Dropdown
        placeholder='Select Grid Size'
        selection
        options={sizeOptions}
      />
    )
  }
}

export default GridSizeDropdown
