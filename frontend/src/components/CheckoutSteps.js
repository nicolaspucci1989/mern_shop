import React from "react"
import { Nav, NavLink } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { step: step1, link: "/login", label: "Ingresar" },
    { step: step2, link: "/shipping", label: "Envio" },
    { step: step3, link: "/payment", label: "Pago" },
    { step: step4, link: "/placeorder", label: "Ordenar" },
  ]
  return (
    <Nav className="justify-content-center mb-4">
      {steps.map((step, key) => (
        <Nav.Item key={key}>
          {step.step ? (
            <LinkContainer to={step.link}>
              <NavLink>{step.label}</NavLink>
            </LinkContainer>
          ) : (
            <NavLink disabled>{step.label}</NavLink>
          )}
        </Nav.Item>
      ))}
    </Nav>
  )
}

export default CheckoutSteps
