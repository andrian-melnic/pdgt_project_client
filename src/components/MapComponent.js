import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'semantic-ui-react'

import PositionFail from './PositionFail'
// import { Icon } from 'leaflet'
import axios from 'axios'

const userPosIcon = L.divIcon({
  className: 'custom icon',
  html: ReactDOMServer.renderToString(
    <Icon name="map marker alternate" color="red" size="big" />
  )
})

const drinkingWaterLocationIcon = L.divIcon({
  className: 'custom icon',
  html: ReactDOMServer.renderToString(
    <Icon name="map marker" color="blue" size="big" />
  )
})
class MapComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      lat: null,
      lng: null,
      zoom: 13,
      locations: [],
      activeLocation: null
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

    axios.get('http://127.0.0.1:3000/drink_water/')
      .then(response => {
        const locations = response.data
        this.setState({ locations })
      })
      .catch(error => {
        console.log(error)
      })
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
              <Marker
                position={[this.state.lat, this.state.lng]}
                icon={userPosIcon}>

                <Popup>
                  <p>Tu sei qui :)</p>
                </Popup>
              </Marker>
              {
                this.state.locations.map(location => (
                  <Marker
                    key={location._id}
                    position={[
                      location.lat,
                      location.lng
                    ]}
                    onclick={() => {
                      this.setState({ activeLocation: location })
                    }}
                    icon={drinkingWaterLocationIcon}>

                  </Marker>
                ))
              }
              {
                this.state.activeLocation && (
                  <Popup
                    position={[
                      this.state.activeLocation.lat,
                      this.state.activeLocation.lng
                    ]}
                    onClose={() => {
                      this.setState({ activeLocation: null })
                    }}>
                    <div>
                      <ul style={{
                        listStyle: 'none',
                        padding: '0'
                      }}>
                        <li>
                           Lat: {this.state.activeLocation.lat}
                        </li>
                        <li>
                           Lng: {this.state.activeLocation.lng}
                        </li>
                        <li>
                          {this.state.activeLocation.comune}, {this.state.activeLocation.provincia}
                        </li>
                      </ul>

                    </div>
                  </Popup>
                )
              }
            </Map>
            : <PositionFail />
        }
      </div>
    )
  }
}

export default MapComponent
