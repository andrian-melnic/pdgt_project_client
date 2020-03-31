import React, { Component } from 'react'
import './App.css'
import MapComponent from './components/MapComponent'
import NavMenu from './components/NavMenu'
import AuthContext from './context/authContext'
import axios from 'axios'
class App extends Component {
  state = {

    lat: null,
    lng: null,
    locations: [],
    locationsAreAvailable: false,
    token: null,
    userId: null,
    tokenExp: null

  }

  getAllLocations = () => {

    this.setState({ locationsAreAvailable: false })
    axios.get('http://127.0.0.1:3000/drink_water/')
      .then(response => {
        const locations = response.data
        this.setState({
          locations,
          locationsAreAvailable: true
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      error => {
        console.log(error.message)
        this.setState({ error: error })
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    )
    this.getAllLocations()
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
          <NavMenu
            lat={this.state.lat}
            lng={this.state.lng}
            getAllLocations={this.getAllLocations} />
          <MapComponent
            lat={this.state.lat}
            lng={this.state.lng}
            getAllLocations={this.getAllLocations}
            locationsAreAvailable={this.state.locationsAreAvailable}
            locations={this.state.locations} />
        </AuthContext.Provider>
      </React.Fragment>
    )
  }
}

export default App
