import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'
import GridSizer from '../components/GridSizeDropdown'
import Next from '../components/FormNextButton'

class SizePage extends Component {
  render() {
    return(
      <Container id="grid-sizer-form">
        <Header as="h2"> Step 1: Choose your grid dimensions
        </Header>
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
