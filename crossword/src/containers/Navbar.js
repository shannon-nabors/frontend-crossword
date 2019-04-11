import React, { Component } from 'react'
import { Header, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOutUser } from '../redux/actions'

class Navbar extends Component {
  state = {
    redirect: false
  }

  render() {

    return(
      <Header id="header">

        <NavLink
          to="/home"
          className="ui header"
          id="logo"
          >crosspost<
        /NavLink>

        <NavLink
          to="/create"
          id="navbar-link"
          >Create<
        /NavLink>

        <NavLink
          to="/profile"
          id="navbar-link"
          >{this.props.currentUser.name ? this.props.currentUser.name : "Profile"}<
        /NavLink>

        <Button
          onClick={this.props.logOutUser}
          id="navbar-link"
          >Log out<
        /Button>

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
