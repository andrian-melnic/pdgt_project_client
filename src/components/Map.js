import React, { Component } from 'react'
// import { GoogleMap } from 'react-google-maps'

class Map extends Component {
  constructor (props) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null
    }
  }

  getPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
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
  }

  render () {
    return (
      <div>
        <button onClick={this.getPosition}>
          Get position
        </button>
        {
          this.state.latitude && this.state.longitude
            ? <div>
              <p>Latitude is:{this.state.latitude}</p>
              <p>Longitude is:{this.state.longitude}</p>
            </div>
            : <p>{this.state.error}</p>
        }
      </div>
    )
  }
}

export default Map
