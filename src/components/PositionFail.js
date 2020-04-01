import React from 'react'
import { Header, Icon } from 'semantic-ui-react'
const PositionFail = () => {
  return (
    <React.Fragment>
      <Header as='h2' icon textAlign='center'>
        <Icon.Group size='large'>
          <Icon size='tiny' color='black' name='map marker alternate' />
          <Icon size='large' color='red' name='dont' />
        </Icon.Group>
        <Header.Content>
          <p>Ooops.. Qualcosa è andato storto</p>
          <h4>Non sono riuscito a ottenere la tua posizione. Controlla i permessi!</h4>
        </Header.Content>
      </Header>
    </React.Fragment>
  )
}
export default PositionFail
