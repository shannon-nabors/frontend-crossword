import React, { Component } from 'react'
import { Button, Form, Container,
         Header } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { URL } from '../redux/constants'
import { logInUser } from '../redux/actions/manageUsers'

class SignupPage extends Component {
  state = {
    username: "",
    name: "",
    email: "",
    password: "",
    redirect: false,
    failed: false
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    fetch(`${URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Accept": "application/json"
      },
    	body:JSON.stringify({
    		username: this.state.username,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
    	})
    }).then(res => res.json())
    .then(data => {
      if (!data.error) {
        this.props.logInUser(data)
        this.setState({redirect: true})
      } else {
        this.setState({failed: true})
      }
    })
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/home"/>
    }

    return(
      <Container className="ui attached segment" id="form-area">
        <Header as='h3'>Sign up</Header>
        <Form error={this.state.failed} onSubmit={this.handleSubmit}>
          <Form.Input
            name="name"
            placeholder="Full name"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <Form.Input
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <Form.Input
            name="email"
            placeholder="Email address"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <Form.Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <Button type="submit">Create an account</Button>
        </Form>
      </Container>
    )
  }
}

export default connect(null, { logInUser })(SignupPage)
