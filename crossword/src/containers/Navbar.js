import React, { Component } from 'react'
import { Header, Button } from 'semantic-ui-react'
import { NavLink, Redirect } from 'react-router-dom'

class Navbar extends Component {
  state = {
    redirect: false
  }

  handleClick = (page) => {
    this.setState({ redirect: page })
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
          to="/"
          id="navbar-link"
          >Log out<
        /NavLink>

      </Header>
    )
  }
}

export default Navbar
