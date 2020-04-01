import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import { Icon, Dimmer, Loader, Button } from 'semantic-ui-react'
import EditModal from './Modals/EditModal'
import AuthContext from '../context/authContext'

import PositionFail from './PositionFail'
// import { Icon } from 'leaflet'
import axios from 'axios'

const userPosIcon = L.divIcon({
  className: 'custom icon',
  html: ReactDOMServer.renderToString(
    <Icon name="map marker alternate" color="red" size="big" />
  )
})

// const drinkingWaterLocationIcon = L.divIcon({
//   className: 'custom icon',
//   html: ReactDOMServer.renderToString(
//     <Icon name="map marker" color="blue" size="big" />
//   )
// })
class MapComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      zoom: 10,
      activeLocation: null,
      isLoading: false
    }
  }

  resetActiveLocation = () => {
    this.setState({ activeLocation: null })
  }

  static contextType = AuthContext
  deleteLocation = () => {
    const activeLocation = this.state.activeLocation._id
    this.setState({ isLoading: true })
    axios({
      url: `http://localhost:3000/drink_water/delete/${activeLocation}`,
      method: 'DELETE',
      headers: {
        Authorization: `Token ${this.context.token}`,
        'Content-Type': 'application/json'
      },
      crossDomain: true
    }).then(res => {
      console.log(res)
      this.resetActiveLocation()
      this.props.getAllLocations()
      this.setState({ isLoading: false, activeLocation: null })
    }).catch(error => {
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
          this.props.lat && this.props.lng
            ? <Map
              center={[this.props.lat, this.props.lng]}
              zoom={this.state.zoom}
              preferCanvas={true}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[this.props.lat, this.props.lng]}
                icon={userPosIcon}
                zIndexOffset={-1}
                interactive={false}>

                {/* <Popup>
                  <p>Tu sei qui :)</p>
                </Popup> */}
              </Marker>
              {
                this.props.locationsAreAvailable && !this.state.isLoading
                  ? this.props.locations.map(location => (
                    <CircleMarker
                      key={location._id}
                      center={[
                        location.lat,
                        location.lng
                      ]}
                      onclick={() => {
                        this.setState({ activeLocation: location })
                      }}
                      radius={10}
                      fillOpacity={1}
                      stroke={false}
                    />
                  ))
                  : <Dimmer active>
                    <Loader />
                  </Dimmer>
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
                      {
                        (this.state.activeLocation && this.context.token &&
                        (this.context.userID === this.state.activeLocation.addedBy))
                          ? <Button.Group>
                            <Button icon='close' color='red' name='delete'
                              onClick={() => this.deleteLocation()} />
                            <EditModal
                              lat={this.props.lat}
                              lng={this.props.lng}
                              getAllLocations={this.props.getAllLocations}
                              activeLocation={this.state.activeLocation}
                              resetActiveLocation={this.resetActiveLocation}
                              setLat={this.props.setLat}
                              setLng={this.props.setLng}
                            />
                          </Button.Group>
                          : null
                      }

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
