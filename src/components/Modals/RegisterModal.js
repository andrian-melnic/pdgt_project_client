import React, { Component } from 'react'
import { Modal, Menu, Button } from 'semantic-ui-react'
import RegisterForm from '../Forms/RegisterForm'
class RegisterModal extends Component {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  render () {
    const { open } = this.state
    return (
      <Modal
        open = {open}
        onOpen={this.open}
        onClose={this.close}
        trigger={<Menu.Item content='Registrati' />}>
        <Modal.Header>Registrati</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <RegisterForm closeModal={this.close}/>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button icon='close' content='Chiudi' onClick={this.close} />
        </Modal.Actions>
      </Modal>

    )
  }
}

export default RegisterModal
