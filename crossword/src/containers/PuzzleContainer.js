import React, { Component } from 'react'
import PuzzleCard from './PuzzleCard'
import { Container } from 'semantic-ui-react'

class PuzzleContainer extends Component {
  render() {
    return (
      <Container className="ui cards">
        {this.props.puzzles.map(p => <PuzzleCard key={p.id} puzzle={p} />)}
      </Container>
    )
  }
}

export default PuzzleContainer
