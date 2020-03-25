import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'

class MapComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      latitude: null,
      longitude: null
    }
  }

  componentDidMount () {
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

  // getPosition = () => {

  // }

  render () {
    return (
      <div>
        {
          this.state.latitude && this.state.longitude
            ? <Map google={this.props.google} zoom={14}
              initialCenter={{
                lat: this.state.latitude,
                lng: this.state.longitude
              }}>

              <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

              {/* <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow> */}
            </Map>
            : null
        }
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDhq8q9zd7dkRcLhAULvy9ai256nPth07g')
})(MapComponent)
