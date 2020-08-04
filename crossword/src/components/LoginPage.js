import React, { Component } from 'react'
import { Button, Form, Container,
         Header, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logInUser } from '../redux/actions/manageUsers'
import { URL } from '../redux/constants'

class Login extends Component {
  state = {
    username: "",
    password: "",
    // redirect: false,
    failed: false
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    if (this.state.username === "") {
      this.setState({failed: true})
    } else {
      fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          "Accept": "application/json"
        },
        body:JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      }).then(res => res.json())
      .then(data => {
        if (!data.error) {
          localStorage.setItem('crossPostJWT', data.token)
          this.props.logInUser(data.user)
          // this.setState({redirect: true})
        } else {
          this.setState({failed: true})
        }
      })
    }
  }

  render() {

    // if (this.state.redirect) {
    //   return <Redirect to="/home"/>
    // }

    return(
      <Container className="ui attached segment" id="form-area">
        <Header as='h3'>Log in</Header>
        <Form error={this.state.failed} onSubmit={this.handleSubmit}>
          <Form.Input
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <Form.Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <Message
            error
            header="Uh-oh!"
            content="Sorry, we can't find a user with that username and password."
          />
          <Button type="submit">Log in</Button>
        </Form>
        <br></br>
        <br></br>
        <Link to="/signup" className="fluid ui button">
        New user? Create an account
        </Link>
      </Container>
    )
  }
}

export default connect(null, { logInUser })(Login)
