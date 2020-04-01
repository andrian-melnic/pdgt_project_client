import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import EditLocationForm from '../Forms/EditLocationForm'
// import LoginForm from '../Forms/LoginForm'
class EditModal extends Component {
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
        trigger={<Button type='button' icon='edit' color='yellow' name='edit' />}>
        <Modal.Header>Modifica</Modal.Header>
        <Modal.Content>
          <EditLocationForm
            userLat={this.props.userLat}
            userLng={this.props.userLng}
            refresh={this.props.getAllLocations}
            activeLocation={this.props.activeLocation}
            updateActiveLocation={this.props.updateActiveLocation}
            resetActiveLocation={this.props.resetActiveLocation}
            setCenterLat={this.props.setCenterLat}
            setCenterLng={this.props.setCenterLng}
          />

        </Modal.Content>
        <Modal.Actions>
          <Button icon='close' content='Chiudi' onClick={this.close} />
        </Modal.Actions>
      </Modal>
    )
  }
}
export default EditModal
