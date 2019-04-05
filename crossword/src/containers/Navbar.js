import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return(
      <Header id="header">
        <NavLink to="/home" className="ui header" >crosspost</NavLink>
        <NavLink to="/create">Create</NavLink>
      </Header>
    )
  }
}

export default Navbar
