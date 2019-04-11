import React, { Component } from 'react'
import { Button, Form, Container, Header, Message } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logInUser } from '../redux/actions/manageUsers'

class Login extends Component {
  state = {
    username: "",
    redirect: false,
    failed: false
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    fetch('http://localhost:3000/users/login', {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Accept": "application/json"
      },
    	body:JSON.stringify({
    		username: this.state.username,
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
        <Header as='h3'>Log in</Header>
        <Form error={this.state.failed} onSubmit={this.handleSubmit}>
          <Form.Input
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <Message
            error
            header="Username incorrect"
            content="No user exists with that username"
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
