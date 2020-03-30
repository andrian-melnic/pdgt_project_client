import React, { Component } from 'react'
import { Responsive, Button, Menu, Dropdown } from 'semantic-ui-react'
import LoginModal from './Modals/LoginModal'
// const menuOptions = {
//   login: { name: 'login', content: 'Login' },
//   logout: { name: 'logout', content: 'Logout' },
//   register: { name: 'register', content: 'Registrati' },
//   addLocation: { name: 'addLocation', content: 'Aggiungi posizione' }
// }

export default class ResponsiveExampleContent extends Component {
  state = { active: 'null' }

  handleItemClick = (e, { name }) => this.setState({ active: name })

  render () {
    return (
      <Menu style={{ margin: '0' }}>
        <Menu.Item header>App</Menu.Item>
        {/* Desktop */}
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <LoginModal />
        </Responsive>

        <Responsive minWidth={Responsive.onlyTablet.minWidth} >
          Register
        </Responsive>

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
