import React, { Component } from 'react'
import { Grid, Form, Button, Message, Dimmer, Loader } from 'semantic-ui-react'
const axios = require('axios')

class RegisterForm extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',

    isLoading: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
    passwordMatchError: false,
    formError: false,
    createUserError: false,

    userCreated: false
  }

  handleRegister = () => {
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
      url: 'http://localhost:3000/users/register',
      method: 'POST',
      data: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.setState({ isLoading: false })
      if (res.data.error) {
        this.setState({
          createUserError: true,
          formError: true
        })
        if (res.data.error === 'User exits already') {
          this.setState({ userExist: true })
        }
      } else {
        this.setState({
          userCreated: true
        })
      }
    }).catch(err => {
      this.setState({
        formError: true
      })
      console.log(err)
    })
  }

  handleChange = input => event => {
    this.setState({ [input]: event.target.value })
  }

  handleSubmit = (e) => {
    this.setState({
      createUserError: false,
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

    if (!(this.state.password.match(passwordFormat))) {
      this.setState({ passwordError: true })
      error = true
    } else {
      this.setState({ passwordError: false })
    }
    if (this.state.confirmPassword !== this.state.password) {
      this.setState({ passwordMatchError: true })
      error = true
    } else {
      this.setState({ passwordMatchError: false })
    }

    if (error) {
      this.setState({ formError: true })
    } else {
      this.setState({ formError: false })
      this.handleRegister()
    }
  }

  render () {
    return (
      <React.Fragment>
        {
          this.state.isLoading &&
          <Dimmer active>
            <Loader />
          </Dimmer>
        }
        {
          this.state.userCreated
            ? <Message
              success
              header='Welcome'
              content={
                <span>Puoi fare il login ora.
                </span>
              } />
            : <Grid columns='equal'>
              <Grid.Row>

                <Grid.Column>
                </Grid.Column>

                <Grid.Column width={10}>
                  <Form
                    onSubmit={(event) => { this.handleSubmit(event) }}
                    error={
                      this.state.createUserError || this.state.formError
                    }>
                    {
                      this.state.createUserError && this.state.userExist
                        ? <Message
                          error
                          header='Ooops...'
                          content={
                            <span>
                              Esiste già un account con questo indirizzo email.
                            </span>
                          } />
                        : null
                    }

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
                      onChange={this.handleChange('password')}
                      error={
                        this.state.passwordError ||
                          this.state.passwordMatchError
                      }
                    />
                    {
                      this.state.passwordError
                        ? <Message
                          error
                          content='Password must be between 6 to 20 characters
                                      and contain at least one number,
                                      one uppercase and one lowercase letter'/>
                        : null
                    }

                    <Form.Input
                      fluid
                      type='password'
                      placeholder="Confirm password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.handleChange('confirmPassword')}
                      error={this.state.passwordMatchError}
                    />
                    {
                      this.state.passwordMatchError
                        ? <Message
                          error
                          content='Passwords do not match'/>
                        : null
                    }
                    <Button color='green' type="submit" fluid>Conferma</Button>
                  </Form>
                </Grid.Column>

                <Grid.Column>
                </Grid.Column>
              </Grid.Row>
            </Grid>

        }
      </React.Fragment>
    )
  }
}
export default RegisterForm
