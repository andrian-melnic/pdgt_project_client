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
        <Modal.Header>Aggiungi posizione</Modal.Header>
        <Modal.Content>
          <EditLocationForm
            lat={this.props.lat}
            lng={this.props.lng}
            refresh={this.props.getAllLocations}
            activeLocation={this.props.activeLocation}
            resetActiveLocation={this.props.resetActiveLocation}
            setLat={this.props.setLat}
            setLng={this.props.setLng}
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
