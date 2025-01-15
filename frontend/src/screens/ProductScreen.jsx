import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
// import axios from "axios";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

function ProductScreen() {
  // const [product, setProduct] = useState({});
  const { id: productId } = useParams();
  // const product = products.find((p) => p._id === productId);
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  console.log("aaaa", useGetProductDetailsQuery(productId));

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(
  //       `http://localhost:3000/api/products/${productId}`
  //     );
  //     setProduct(data);
  //   };

  //   fetchProduct();
  // }, [productId]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error?.data.message || error.error}</div>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock ? "In Stock" : "Out of stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}

export default ProductScreen;
