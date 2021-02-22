import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import FormContainer from "../components/FormContainer"
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap"
import { saveShippingAddress } from "../actions/cartActions"
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push("/payment")
  }

  const fields = [
    {
      controlId: "address",
      label: "Direccion",
      placeholder: "Ingrese Direccion",
      value: address,
      onChange: setAddress,
    },
    {
      controlId: "city",
      label: "Ciudad",
      placeholder: "Ingrese Ciudad",
      value: city,
      onChange: setCity,
    },
    {
      controlId: "postalCode",
      label: "Codigo Postal",
      placeholder: "Ingrese us codigo postal",
      value: postalCode,
      onChange: setPostalCode,
    },
    {
      controlId: "country",
      label: "Pais",
      placeholder: "Ingrese su pais",
      value: country,
      onChange: setCountry,
    },
  ]

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Envio</h1>
      <Form onSubmit={submitHandler}>
        {fields.map((f) => (
          <FormGroup controlId={f.controlId} key={f.controlId}>
            <FormLabel>{f.label}</FormLabel>
            <FormControl
              type="text"
              placeholder={f.placeholder}
              value={f.value}
              requred="required"
              onChange={(e) => f.onChange(e.target.value)}
            />
          </FormGroup>
        ))}

        <Button variant="primary" type="submit">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
