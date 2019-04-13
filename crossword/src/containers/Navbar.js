import React, { Component } from 'react'
import { Header, Menu, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOutUser } from '../redux/actions/manageUsers'

import HomeLogo from '../components/HomeLogo'

class Navbar extends Component {
  state = {
    redirect: false
  }

  render() {

    return(
      <Header id="header">
        {this.props.currentUser.name ? (
          <Container id="nav-menu-full">
            <Menu widths={5} >
              <Menu.Item
                fitted
                as={ Link }
                to="/home"
              >
                <HomeLogo id="navbar-logo"/>
              </Menu.Item>

              <Menu.Item
                as={ Link }
                to="/create"
              > Create
              </Menu.Item>

              <Menu.Item
                as={ Link }
                to="/solve"
              > Solve
              </Menu.Item>

              <Menu.Item
                as={ Link }
                to="/profile"
              > {this.props.currentUser.name}
              </Menu.Item>

              <Menu.Item
                as={ Link }
                to="/"
                onClick={this.props.logOutUser}
              > Log out
              </Menu.Item>
            </Menu>
          </Container>
        ) : (
          <Container id="nav-menu-half">
            <Menu >
              <Menu.Item
                fitted
                as={ Link }
                to="/home"
              >
                <HomeLogo id="navbar-logo"/>
              </Menu.Item>
            </Menu>
          </Container>
        )}

      </Header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { logOutUser })(Navbar)
