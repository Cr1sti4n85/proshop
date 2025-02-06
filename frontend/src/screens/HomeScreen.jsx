import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
// import products from "../products";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";

function HomeScreen() {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keyword} />
        </>
      )}
    </>
  );
}

export default HomeScreen;
