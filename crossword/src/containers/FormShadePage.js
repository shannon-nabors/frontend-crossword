import React, { Component, Fragment } from 'react'
import { Container, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Next from '../components/FormNextButton'
import Puzzle from './Puzzle'

class ShadePage extends Component {

  render() {
    return(
      <Fragment>
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

        <Dimmer active={this.props.loading ? true : false}>
          <Loader size='large'>Creating puzzle</Loader>
        </Dimmer>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    puzzle: state.newPuzzle,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(ShadePage)
