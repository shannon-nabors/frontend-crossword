import React, { Component, Fragment } from 'react'
import { Menu, Segment, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PuzzleContainer from './PuzzleContainer'

class CurrentUserPage extends Component {
  state = {
    menu: "Published"
  }

  handleMenuClick = (e, { name }) => {
    this.setState({ menu: name })
  }

  render() {
    return(
      <Container>
        <Menu attached='top' tabular>
          <Menu.Item
            name='Published'
            active={this.state.menu === "Published"}
            onClick={this.handleMenuClick}
          />
          <Menu.Item
            name='Solved'
            active={this.state.menu === "Solved"}
            onClick={this.handleMenuClick}
          />
        </Menu>
        <Segment
          attached="bottom"
          id="user-page-puzzles"
        >
          <PuzzleContainer
            puzzles={ this.state.menu === "Published" ? this.props.userPuzzles : this.props.solvedPuzzles }
          />
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userPuzzles: state.userPuzzles,
    solvedPuzzles: state.solvedPuzzles
  }
}

export default connect(mapStateToProps)(CurrentUserPage)
