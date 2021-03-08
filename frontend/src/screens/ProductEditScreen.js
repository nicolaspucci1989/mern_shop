import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  Button,
  Form,
  FormControl,
  FormFile,
  FormGroup,
  FormLabel,
} from "react-bootstrap"

import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { Link } from "react-router-dom"
import {
  PRODUCT_DETAILS_DESTROY,
  PRODUCT_UPDATE_RESET,
} from "../constants/productConstants"
import { listProductDetails, updateProduct } from "../actions/productActions"
import axios from "axios"

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState("")
  const [countInStock, setCountInStock] = useState(0)
  const [brand, setBrand] = useState("")
  const [image, setImage] = useState("")
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      dispatch({ type: PRODUCT_DETAILS_DESTROY })
      history.push("/admin/productlist")
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setBrand(product.brand)
        setImage(product.image)
      }
    }
  }, [dispatch, productId, product, successUpdate, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        description,
        price,
        category,
        countInStock,
        brand,
        image,
      })
    )
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)
    setUploading(true)

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } }

      const { data } = await axios.post("/api/upload", formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Volver
      </Link>
      <FormContainer>
        <h1>Editar Producto</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId={"name"}>
              <FormLabel>Nombre</FormLabel>
              <FormControl
                type="name"
                placeholder="Ingrese nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId={"description"}>
              <FormLabel>Descripcion</FormLabel>
              <FormControl
                type="text"
                placeholder="Ingrese descripcion"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId={"price"}>
              <FormLabel>Precio</FormLabel>
              <FormControl
                type="number"
                label="Precio"
                value={price}
                onChange={(e) => setPrice(e.target.valueAsNumber)}
              />
            </FormGroup>

            <FormGroup controlId={"category"}>
              <FormLabel>Categoria</FormLabel>
              <FormControl
                type="text"
                label="Categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId={"countInStock"}>
              <FormLabel>Cantidad en stock</FormLabel>
              <FormControl
                type="number"
                label="Cantidad en stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.valueAsNumber)}
              />
            </FormGroup>

            <FormGroup controlId={"brand"}>
              <FormLabel>Marca</FormLabel>
              <FormControl
                type="text"
                label="Marca"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId={"image"}>
              <FormLabel>Imagen</FormLabel>
              <FormControl
                type="text"
                placeholder="Ingrese url de la imagen"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <FormFile
                id="image-file"
                label="elegir archivo"
                custom
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
            </FormGroup>

            <Button type="submit" variant="primary">
              Actualizar
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
