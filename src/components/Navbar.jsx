import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function AppNavbar({cantidadTotal}) {
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.brand}>
          <img
            src="/img/logo.svg"
            alt="Logo Brote Vivero"
            className={styles.brandLogo}
          />
          Brote
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.activeLink : ""}`
              }
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/productos"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.activeLink : ""}`
              }
            >
              Productos
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/formulario"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.activeLink : ""}`
              }
            >
              Finalizar compra
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/contacto"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.activeLink : ""}`
              }
            >
              Contacto
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/carrito"
              className={`${styles.btnCarrito} ms-lg-2`}
            >
              🛒 Carrito <span className={styles.badgeCarrito}>{cantidadTotal}</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
