import React, { useState } from "react"
import FormContainer from "../components/FormContainer"
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { saveShippingAddress } from "../actions/cartActions"

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

  return (
    <FormContainer>
      <h1>Envio</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId={"address"}>
          <FormLabel>Direccion</FormLabel>
          <FormControl
            type="text"
            placeholder="Ingrese direccion"
            value={address}
            requred
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId={"city"}>
          <FormLabel>Ciudad</FormLabel>
          <FormControl
            type="text"
            placeholder="Ingrese ciudad"
            value={city}
            requred
            onChange={(e) => setCity(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId={"postalCode"}>
          <FormLabel>Codigo Postal</FormLabel>
          <FormControl
            type="text"
            placeholder="Ingrese su codigo postal"
            value={postalCode}
            requred
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId={"country"}>
          <FormLabel>Pais</FormLabel>
          <FormControl
            type="text"
            placeholder="Ingrese su pais"
            value={country}
            requred
            onChange={(e) => setCountry(e.target.value)}
          />
        </FormGroup>
        <Button variant="primary" type="submit">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
