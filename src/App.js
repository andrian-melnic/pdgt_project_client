import React, { Component } from 'react'
import './App.css'
import MapComponent from './components/MapComponent'
import NavMenu from './components/NavMenu'
import AuthContext from './context/authContext'
class App extends Component {
  state = {
    token: null,
    userId: null,
    tokenExp: null
  }

  login = (token, userId, tokenExp) => {
    this.setState({
      token: token,
      userId: userId,
      tokenExp: tokenExp
    })
  }

  logout = () => {
    this.setState({
      token: null,
      userId: null,
      tokenExp: null
    })
  }

  render () {
    return (
      <React.Fragment>
        <AuthContext.Provider value={{
          token: this.state.token,
          userID: this.state.userId,
          login: this.login,
          logout: this.logout
        }}>
          <NavMenu />
          <MapComponent />
        </AuthContext.Provider>
      </React.Fragment>
    )
  }
}

export default App
