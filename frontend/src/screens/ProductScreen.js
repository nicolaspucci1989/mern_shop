import React from 'react';
import products from "../products";
import { Link } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Rating } from "../components/Rating";

const ProductScreen = ({ match }) => {
  const product = products.find(p => p._id === match.params.id)
  return (
    <>
      <Link className={'btn btn-light my-3'} to={'/'}>
        Volver
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
          <ListGroup variant={'flush'}>
            <ListGroupItem>
              <h2>{product.name}</h2>
            </ListGroupItem>
            <ListGroupItem>
              <Rating rating={product.rating} numReviews={product.numReviews}/>
            </ListGroupItem>
            <ListGroupItem>
              Precio: ${product.price}
            </ListGroupItem>
            <ListGroupItem>
              Descripcion: {product.description}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant={"flush"}>
              <ListGroupItem>
                <Col>Precio:</Col>
                <Col>
                  <strong>${product.price}</strong>
                </Col>
              </ListGroupItem>

              <ListGroupItem>
                <Col>Status:</Col>
                <Col>
                  {product.countInStock ? 'En stock' : 'Sin stock'}
                </Col>
              </ListGroupItem>

              <ListGroupItem>
               <Button className={'btn-block'} type={'button'} disabled={!product.countInStock}>
                 Agregar al carrito
               </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
