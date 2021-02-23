import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import FormContainer from "../components/FormContainer"
import {
  Button,
  Col,
  Form,
  FormCheck,
  FormGroup,
  FormLabel,
} from "react-bootstrap"
import CheckoutSteps from "../components/CheckoutSteps"
import { savePaymentMethod } from "../actions/cartActions"

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push("/shipping")
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal")

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push("/placeorder")
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Metodo de pago</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel as="legend">Seleccionar metodo</FormLabel>
          <Col>
            <FormCheck
              type="radio"
              label="Paypal o tarjeta de credito"
              id="Paypal"
              name="paymentMethod"
              value="Paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </FormGroup>

        <Button variant="primary" type="submit">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
