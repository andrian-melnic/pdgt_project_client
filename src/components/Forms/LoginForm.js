import React, { Component } from 'react'
import { Grid, Form, Button, Message, Dimmer, Loader } from 'semantic-ui-react'
import AuthContext from '../../context/authContext'
const axios = require('axios')

class LoginForm extends Component {
  state = {
    email: '',
    password: '',

    isLoading: false,
    emailError: false,
    passwordError: false,
    loginError: false,
    formError: false
  }

  static contextType = AuthContext
  handleLogin = () => {
    const email = this.state.email
    const password = this.state.password
    const reqBody = {
      user: {
        email: email,
        password: password
      }
    }
    this.setState({ isLoading: true })
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
      if (res.data.user.token) {
        this.context.login(
          res.data.user.token,
          res.data.user.id,
          res.data.user.exp
        )
      }
      this.setState({
        isLoading: false,
        loggedIn: true
      })
    }).catch(error => {
      this.setState({ isLoading: false })
      if (error.response.status === 401) {
        this.setState({
          loginError: true,
          formError: true
        })
      }
      console.log(error)
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
    e.preventDefault()
    let error = false

    if (this.state.email === '') {
      this.setState({ emailError: true })
      error = true
    } else {
      this.setState({ emailError: false })
    }
    if (this.state.password === '') {
      this.setState({ passwordError: true })
      error = true
    } else {
      this.setState({ passwordError: false })
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
      <React.Fragment>
        {
          this.state.loginError &&
          <Message
            error
            content='Email o password non corretta'/>
        }
        {
          this.state.isLoading &&
          <Dimmer active>
            <Loader />
          </Dimmer>
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
                <Form.Input
                  fluid
                  type='email'
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  error={this.state.emailError}
                />

                <Form.Input
                  fluid
                  type='password'
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  error={this.state.passwordError}/>
                <Button color='green' type="submit" fluid>Conferma</Button>
              </Form>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}
export default LoginForm
