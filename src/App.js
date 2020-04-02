import React, { Component } from 'react'
import './App.css'
import MapComponent from './components/MapComponent'
import NavMenu from './components/NavMenu'
import AuthContext from './context/authContext'

import PositionFail from './components/PositionFail'
import axios from 'axios'
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {

      userLat: null,
      userLng: null,
      locations: [],
      locationsAreAvailable: false,
      filter: '',
      filteredLocations: [],
      token: null,
      userId: null,
      tokenExp: null

    }
  }

  handleChangeFilter = (event) => {
    this.setState({ filter: event.target.value }, () => {
      this.filterLocations()
    })
  }

  filterLocations = () => {
    let results
    if (this.state.filter === '' || !this.state.filter.match(/^(?!\s*$).+/)) {
      results = this.state.locations
    } else {
      results = this.state.locations.filter((loc) => {
        return loc.address.toLowerCase().includes(this.state.filter.toLowerCase())
      })
    }
    this.setState({ filteredLocations: results })
  }

  getAllLocations = () => {
    this.setState({ locationsAreAvailable: false })
    axios.get('/drink_water/')
      .then(response => {
        const locations = response.data
        this.setState({
          locations,
          locationsAreAvailable: true
        })
        this.filterLocations()
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLat: position.coords.latitude,
          userLng: position.coords.longitude
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
          {
            this.state.userLat && this.state.userLng
              ? <React.Fragment>

                <NavMenu style={{ position: 'fixed' }}
                  userLat={this.state.userLat}
                  userLng={this.state.userLng}
                  getAllLocations={this.getAllLocations}
                  changeFilter={this.handleChangeFilter} />
                <MapComponent
                  userLat={this.state.userLat}
                  userLng={this.state.userLng}
                  getAllLocations={this.getAllLocations}
                  locationsAreAvailable={this.state.locationsAreAvailable}
                  locations={this.state.filteredLocations}
                />
              </React.Fragment>
              : <PositionFail />
          }
        </AuthContext.Provider>
      </React.Fragment>
    )
  }
}

export default App
