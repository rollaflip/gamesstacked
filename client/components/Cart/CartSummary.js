import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Grid, Button} from 'semantic-ui-react'

class CartSummary extends React.Component {
  render() {
    const {totalPrice} = this.props

    return (
      <Card>
        <Card.Content>
          <Card.Header>Order Summary</Card.Header>
          <Card.Description>
            Order Total: ${totalPrice.toFixed(2)}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default CartSummary
