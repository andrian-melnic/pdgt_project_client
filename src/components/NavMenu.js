import React, { Component } from 'react'
import { Responsive, Button, Menu, Dropdown } from 'semantic-ui-react'
import LoginModal from './Modals/LoginModal'
import RegisterModal from './Modals/RegisterModal'
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
        <Menu style={{ margin: '0' }}>
          <Menu.Item header>App</Menu.Item>
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
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
              <Menu.Item content='Logout' onClick={context.logout}/>
            </Responsive>
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
