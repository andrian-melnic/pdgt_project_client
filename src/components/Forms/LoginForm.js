import React, { Component } from 'react'
import { Grid, Form, Button, Message } from 'semantic-ui-react'
const axios = require('axios')

class LoginForm extends Component {
  state = {
    email: '',
    password: '',

    emailError: false,
    loginError: false,
    formError: false
  }

  handleLogin = () => {
    const email = this.state.email
    const password = this.state.password
    const reqBody = {
      user: {
        email: email,
        password: password
      }
    }

    // Authentication -- fetch the request
    axios({
      url: 'http://localhost:3000/users/login',
      method: 'POST',
      data: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      },
      crossDomain: true
    }).then(res => {
      this.setState({
        loggedIn: true
      })
      console.log(res.data.user.token)
    }).catch(error => {
      if (error.response.status === 401) {
        this.setState({
          loginError: true,
          formError: true
        })
      } else {
        console.log(error)
      }
    })
  }

  handleChange = input => event => {
    this.setState({ [input]: event.target.value })
  }

  handleSubmit = (e) => {
    this.setState({
      loginError: false,
      formError: false
    })
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
    e.preventDefault()
    let error = false

    if (this.state.email === '' &&
    !(this.state.email.match(emailFormat))) {
      this.setState({ emailError: true })
      error = true
    } else {
      this.setState({ emailError: false })
    }
    if (error) {
      this.setState({ formError: true })
    } else {
      this.setState({ formError: false })
      this.handleLogin()
    }
  }

  render () {
    return (
      <div>
        {
          this.state.loginError
            ? <Message
              error
              content='Email o password non corretta'/>
            : null
        }
        <Grid columns='equal'>
          <Grid.Row>

            <Grid.Column>
            </Grid.Column>
            <Grid.Column width={10}>
              <Form
                onSubmit={(event) => { this.handleSubmit(event) }}
                error={
                  this.state.formError
                }>

                <Form.Group widths="equal">

                  <Form.Input
                    fluid
                    type='email'
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    error={this.state.emailError}
                  />
                  {
                    this.state.emailError
                      ? <Message
                        error
                        content='Please enter a valid email address'/>
                      : null
                  }

                  <Form.Input
                    fluid
                    type='password'
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}/>
                </Form.Group>
                <Button type="submit" fluid>Submit</Button>
              </Form>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
export default LoginForm
