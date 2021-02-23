import React from "react"
import { Col, ListGroupItem, Row } from "react-bootstrap"

const OrderSummary = ({ summary }) => (
  <>
    <ListGroupItem>
      <h2>Resumen de orden</h2>
    </ListGroupItem>

    <ListGroupItem>
      <Row>
        <Col>Items</Col>
        <Col>${summary.itemsPrice}</Col>
      </Row>
    </ListGroupItem>

    <ListGroupItem>
      <Row>
        <Col>Envio</Col>
        <Col>${summary.shippingPrice}</Col>
      </Row>
    </ListGroupItem>

    <ListGroupItem>
      <Row>
        <Col>Impuestos</Col>
        <Col>${summary.taxPrice}</Col>
      </Row>
    </ListGroupItem>

    <ListGroupItem>
      <Row>
        <Col>Total</Col>
        <Col>${summary.totalPrice}</Col>
      </Row>
    </ListGroupItem>
  </>
)

export default OrderSummary
