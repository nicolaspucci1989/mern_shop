import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap"

import FormContainer from "../components/FormContainer"
import { register } from "../actions/userActions"
import Message from "../components/Message"
import Loader from "../components/Loader"

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("El password no coincide")
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Registrarse</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <FormGroup controlId={"name"}>
          <FormLabel>Nombre</FormLabel>
          <FormControl
            type="name"
            placeholder="Ingrese name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId={"email"}>
          <FormLabel>Email Address</FormLabel>
          <FormControl
            type="email"
            placeholder="Ingrese email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId={"password"}>
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Ingrese password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId={"confirmPassword"}>
          <FormLabel>Confirmar Password</FormLabel>
          <FormControl
            type="password"
            placeholder="Confirmar password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>

        <Button type="submit" variant="primary">
          Registrarse
        </Button>

        <Row className="py-3">
          <Col>
            Tenes una cuenta?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Ingresar
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen
