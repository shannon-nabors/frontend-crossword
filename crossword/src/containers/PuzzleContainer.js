import React, { Component, Fragment } from 'react'
import PuzzleCard from './PuzzleCard'
import { connect } from 'react-redux'
import { Container, Dimmer, Loader } from 'semantic-ui-react'

class PuzzleContainer extends Component {
  render() {
    return (
      <Fragment>
        <Container className="ui cards centered">
          {this.props.puzzles.map(p => <PuzzleCard key={p.id} puzzle={p} />)}
        </Container>

        <Dimmer active={this.props.loading ? true : false}>
          <Loader size='large'>Loading puzzles</Loader>
        </Dimmer>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading
  }
}

export default connect(mapStateToProps)(PuzzleContainer)
