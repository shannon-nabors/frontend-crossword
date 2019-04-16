import React, { Component } from 'react'
import { Menu, Segment, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'

class CurrentUserPage extends Component {
  state = {
    menu: "solvers"
  }

  handleMenuClick = (e, { name }) => {
    this.setState({ menu: name })
  }

  render() {
    return(
      <Container>
        <Menu attached='top' tabular>
          <Menu.Item
            name='solvers'
            active={this.state.menu === 'solvers'}
            onClick={this.handleMenuClick}
          />
          <Menu.Item
            name='constructors'
            active={this.state.menu === 'constructors'}
            onClick={this.handleMenuClick}
          />
        </Menu>
        <Segment
          attached="bottom"
        >
          {this.state.menu === 'solvers' ? (
            <Container>
              solvers
            </Container>
          ) : (
            <Container>
              constructors
            </Container>
          )}
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.currentUser
  }
}

export default connect(mapStateToProps)(CurrentUserPage)
