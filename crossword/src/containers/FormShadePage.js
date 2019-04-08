import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Next from '../components/FormNextButton'
import Puzzle from './Puzzle'

class ShadePage extends Component {

  render() {
    return(
      <Container id="puz-sizer">
        <div>
          <Puzzle
            puzzle={this.props.puzzle}
            editable={null}
            shadeable="true"
          />
        </div>
        <div>
          <Next/>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    puzzle: state.newPuzzle
  }
}

export default connect(mapStateToProps)(ShadePage)
