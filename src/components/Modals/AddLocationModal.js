import React, { Component } from 'react'
import { Modal, Menu, Button } from 'semantic-ui-react'
import AddLocationForm from '../Forms/AddLocationForm'
// import LoginForm from '../Forms/LoginForm'
class AddLocationModal extends Component {
  constructor (props) {
    super(props)
    this.state = { open: false }
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  render () {
    const { open } = this.state
    return (
      <Modal
        open = {open}
        onOpen={this.open}
        onClose={this.close}
        trigger={<Menu.Item content='Aggiungi posizione' />}>
        <Modal.Header>Aggiungi posizione</Modal.Header>
        <Modal.Content>
          <AddLocationForm
            lat={this.props.lat}
            lng={this.props.lng}
            refresh={this.props.getAllLocations}
          />

        </Modal.Content>
        <Modal.Actions>
          <Button icon='close' content='Chiudi' onClick={this.close} />
        </Modal.Actions>
      </Modal>
    )
  }
}
export default AddLocationModal
