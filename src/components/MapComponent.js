import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'

class MapComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lat: null,
      lng: null,
      zoom: 13
    }
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
  }

  // getPosition = () => {

  // }

  render () {
    // const position = [this.state.lat, this.state.lng]
    return (
      <div>
        {
          this.state.lat && this.state.lng
            ? <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[this.state.lat, this.state.lng]}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </Map>
            : <h1>oops</h1>
        }
      </div>
    )
  }
}

export default MapComponent
