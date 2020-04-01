import React, { Component } from 'react'
import { Responsive, Button, Menu, Dropdown, Icon } from 'semantic-ui-react'
import LoginModal from './Modals/LoginModal'
import RegisterModal from './Modals/RegisterModal'
import AddLocationModal from './Modals/AddLocationModal'
import AuthContext from '../context/authContext'
// const menuOptions = {
//   login: { name: 'login', content: 'Login' },
//   logout: { name: 'logout', content: 'Logout' },
//   register: { name: 'register', content: 'Registrati' },
//   addLocation: { name: 'addLocation', content: 'Aggiungi posizione' }
// }

const NavMenu = (props) => (
  <AuthContext.Consumer>
    {(context) => {
      return (
        <Menu style={{ margin: '0', borderRadius: '0' }} inverted>
          <Menu.Item header>
            <Icon name='tint' color='blue' />
            App
          </Menu.Item>
          {/* Desktop */}
          {
            !context.token &&
            <React.Fragment>
              <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <LoginModal />
              </Responsive>
              <Responsive minWidth={Responsive.onlyTablet.minWidth} >
                <RegisterModal />
              </Responsive>
            </React.Fragment>
          }
          {
            context.token &&
            <React.Fragment>
              <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <Menu.Item content='Logout' onClick={context.logout}/>
              </Responsive>
              <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <AddLocationModal
                  userLat={props.userLat}
                  userLng={props.userLng}
                  getAllLocations={props.getAllLocations}
                />
              </Responsive>
            </React.Fragment>
          }

          {/* Mobile */}
          {/* <Menu.Menu
                position='right'>
                <Responsive
                  {...Responsive.onlyMobile}>
                  <Menu.Item
                    position='right'
                    icon='content'
                    className='button'
                    onClick={this.handleContentClick}>
                    <Dropdown>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          Login
                        </Dropdown.Item>
                        <Dropdown.Item>
                          Register
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Menu.Item>

                </Responsive>
              </Menu.Menu> */}

        </Menu>
      )
    }
    }
  </AuthContext.Consumer>

)
export default NavMenu
