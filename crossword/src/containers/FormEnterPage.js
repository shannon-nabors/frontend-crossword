import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import Puzzle from './Puzzle'

class EnterPage extends Component {
  render() {
    return(
      <Container id="puz-sizer">
        <div>
          <Puzzle
            puzzle={this.props.puzzle}
            editable="true"
            shadeable={null}
          />
        </div>
        <div>
          <Button>Submit</Button>
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

export default connect(mapStateToProps)(EnterPage)
