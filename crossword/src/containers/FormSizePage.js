import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import GridSizer from '../components/GridSizeDropdown'
import Next from '../components/FormNextButton'

class SizePage extends Component {
  render() {
    return(
      <Container>
        <div>
          <GridSizer/>
        </div>
        <div>
          <Next/>
        </div>
      </Container>
    )
  }
}

export default SizePage
