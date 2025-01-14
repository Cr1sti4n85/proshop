import { Row, Col } from "react-bootstrap";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import products from "../products";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";

function HomeScreen() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get("http://localhost:3000/api/products");
  //     setProducts(data);
  //   };

  //   fetchProducts();
  // }, []);

  console.log(useGetProductsQuery());

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error?.data.message || error.error}</div>
      ) : (
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
      )}
    </>
  );
}

export default HomeScreen;
