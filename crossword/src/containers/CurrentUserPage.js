import React, { Component, Fragment } from 'react'
import { Menu, Segment, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PuzzleContainer from './PuzzleContainer'
import TimeChart from '../components/TimeCompareChart'

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
        <Menu id="tab-menu" attached='top' tabular>

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
          {this.state.menu === this.props.user.first_name ? (
            <Fragment>
              <Container>
                <p>Name: {this.props.user.name}</p>
                <p>Username: {this.props.user.username}</p>
                <p>Puzzles created: {this.props.userPuzzles.length}</p>
                <p>Puzzles solved: {this.props.solvedPuzzles.length}</p>
              </Container>
              <TimeChart/>
            </Fragment>
          ) : (
            <PuzzleContainer
              puzzles={ this.state.menu === "Published" ? this.props.userPuzzles : this.props.solvedPuzzles }
            />
          )}
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userPuzzles: state.userPuzzles,
    solvedPuzzles: state.solvedPuzzles,
    user: state.currentUser
  }
}

export default connect(mapStateToProps)(CurrentUserPage)

// <Menu.Item
//   name={this.props.user.first_name}
//   active={this.state.menu === this.props.user.first_name}
//   onClick={this.handleMenuClick}
// />
