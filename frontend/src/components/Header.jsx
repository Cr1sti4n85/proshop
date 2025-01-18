import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";

function Header() {
  //useSelector puede acceder a propiedades de cart
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="proshop" />
            ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/cart">
              <FaShoppingCart />
              Cart
              {cartItems.length > 0 && (
                <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                  {cartItems.reduce((acc, cur) => acc + cur.qty, 0)}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              <FaUser />
              Sign In
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
