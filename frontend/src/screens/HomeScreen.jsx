import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
// import products from "../products";
import Product from "../components/Product";

function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:3000/api/products");
      console.log(data);
      setProducts(data);
    };

    fetchProducts();
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;
