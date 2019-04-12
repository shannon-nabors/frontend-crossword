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
        <Container id="nav-menu">
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
          > {this.props.currentUser.name ? this.props.currentUser.name : "Profile"}
          </Menu.Item>

          <Menu.Item
            onClick={this.props.logOutUser}
          > Log out
          </Menu.Item>
        </Menu>
        </Container>

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
