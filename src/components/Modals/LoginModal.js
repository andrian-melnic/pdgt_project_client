import React from 'react'
import { Modal, Menu } from 'semantic-ui-react'
import LoginForm from '../Forms/LoginForm'

export default function LoginModal (props) {
  return (
    <Modal trigger={<Menu.Item content='Login' />}>
      <Modal.Header>Login</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <LoginForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}
