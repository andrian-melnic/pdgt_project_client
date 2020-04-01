import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'
import L from 'leaflet'
import { Map, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import { Icon, Dimmer, Loader, Button } from 'semantic-ui-react'
import EditModal from './Modals/EditModal'
import AuthContext from '../context/authContext'
import axios from 'axios'

const userPosIcon = L.divIcon({
  className: 'custom icon',
  html: ReactDOMServer.renderToString(
    <Icon name="map marker alternate" color="red" size="big" />
  )
})
class MapComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      centerLat: this.props.userLat,
      centerLng: this.props.userLng,
      zoom: 12,
      activeLocation: null,
      isLoading: false
    }
  }

  setCenterLat = (newLat) => {
    this.setState({ centerLat: newLat })
  }

  setCenterLng = (newLng) => {
    this.setState({ centerLng: newLng })
  }

  updateActiveLocation = (lat, lng) => {
    this.setState(prevState => ({
      activeLocation: {
        ...prevState.activeLocation,
        lat: lat,
        lng: lng
      }
    })
    )
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


  render () {
    return (
      <React.Fragment>
        <Map
          center={[this.state.centerLat, this.state.centerLng]}
          zoom={this.state.zoom}
          preferCanvas={true}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={[this.props.userLat, this.props.userLng]}
            icon={userPosIcon}
            zIndexOffset={-1}
            interactive={false}>
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
                  onclick={(e) => { this.setState({ activeLocation: location }) }}
                  radius={5}
                  fillOpacity={1}
                  stroke={false}
                  onMouseOver={(e) => e.target.setStyle({ radius: 10 })}
                  onMouseOut={(e) => e.target.setStyle({ radius: 5 })}
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
                <React.Fragment>
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
                          userLat={this.props.userLat}
                          userLng={this.props.userLng}
                          getAllLocations={this.props.getAllLocations}
                          activeLocation={this.state.activeLocation}
                          updateActiveLocation={this.updateActiveLocation}
                          resetActiveLocation={this.resetActiveLocation}
                          setCenterLat={this.setCenterLat}
                          setCenterLng={this.setCenterLng}
                        />
                      </Button.Group>
                      : null
                  }

                </React.Fragment>
              </Popup>
            )
          }
        </Map>
      </React.Fragment>
    )
  }
}

export default MapComponent
