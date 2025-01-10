import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link href="/cart">
              <FaShoppingCart />
              Cart
            </Nav.Link>
            <Nav.Link href="/login">
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
