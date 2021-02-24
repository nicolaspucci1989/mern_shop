import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap"
import { listUserOrders } from "../actions/orderActions"

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const orderUserList = useSelector((state) => state.orderUserList)
  const { loading: loadingOrders, error: errorOrders, orders } = orderUserList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"))
        dispatch(listUserOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("El password no coincide")
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <Row>
      <Col md={3}>
        {" "}
        <h1>Perfil</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Perfil Actualizado!</Message>}
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
            Actualizar
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Mis Ordenes</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
