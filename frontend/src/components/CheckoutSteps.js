import React from "react"
import { Nav, NavLink } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <NavLink>Ingresar</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>Ingresar</NavLink>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <NavLink>Envio</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>Envio</NavLink>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <NavLink>Pago</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>Pago</NavLink>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <NavLink>Ordenar</NavLink>
          </LinkContainer>
        ) : (
          <NavLink disabled>Ordenar</NavLink>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
