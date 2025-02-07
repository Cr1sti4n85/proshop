import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import { BASE_URL } from "../constants";

function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  console.log(products);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.map((prod) => (
        <Carousel.Item key={prod._id}>
          <Link to={`/product/${prod._id}`}>
            <Image src={`${BASE_URL}${prod.image}`} alt={prod.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {prod.name}( ${prod.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
