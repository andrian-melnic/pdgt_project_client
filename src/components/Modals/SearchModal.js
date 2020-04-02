import React, { Component } from 'react'
import { Modal, Button, Input } from 'semantic-ui-react'
// import LoginForm from '../Forms/LoginForm'
class SearchModal extends Component {
  constructor (props) {
    super(props)
    this.state = { open: false, filter: '' }
  }

  handleFilterChange = (event) => {
    this.props.changeFilter(event)
    this.setState({ filter: event.target.value })
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
        trigger={<Button type='button' icon='search'name='edit' color='black' />}>
        <Modal.Header>Cerca</Modal.Header>
        <Modal.Content>
          <Input placeholder='Cerca' value={this.state.filter} onChange={this.handleFilterChange} fluid/>
        </Modal.Content>
        <Modal.Actions>
          <Button icon='close' content='Chiudi' onClick={this.close} />
        </Modal.Actions>
      </Modal>
    )
  }
}
export default SearchModal
