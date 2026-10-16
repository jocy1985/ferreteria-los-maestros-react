import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSesion } from "../context/SesionContext";
import { useCarrito } from "../context/CarritoContext";

function Cabecera() {
  const { usuario, cerrarSesion } = useSesion();
  const { cantidadTotal } = useCarrito();
  const navigate = useNavigate();
  const claseEnlace = ({ isActive }) => `nav-link enlace-menu${isActive ? " activo" : ""}`;

  function salir() { cerrarSesion(); navigate("/"); }
  const rutaPanel = usuario?.rol === "Administrador" ? "/admin" : usuario?.rol === "Empleado" ? "/empleado" : "/mi-cuenta";
  const nombrePanel = usuario?.rol === "Administrador" ? "Administración" : usuario?.rol === "Empleado" ? "Panel empleado" : "Mi cuenta";

  return (
    <Navbar expand="md" className="cabecera-sitio" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="marca">Ferretería Los Maestros</Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto align-items-md-center gap-md-2">
            <NavLink to="/" end className={claseEnlace}>Inicio</NavLink>
            <NavLink to="/catalogo" className={claseEnlace}>Catálogo</NavLink>
            <NavLink to="/ofertas" className={claseEnlace}>Ofertas</NavLink>
            <NavLink to="/carrito" className={claseEnlace}>Mi pedido {cantidadTotal > 0 && <Badge bg="warning" text="dark" className="ms-1">{cantidadTotal}</Badge>}</NavLink>
            {usuario ? (
              <>
                <NavLink to={rutaPanel} className={claseEnlace}>{nombrePanel}</NavLink>
                <Button variant="outline-light" size="sm" onClick={salir}>Cerrar sesión</Button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={claseEnlace}>Iniciar sesión</NavLink>
                <Button as={NavLink} to="/registro" variant="warning" size="sm" className="fw-semibold">Crear cuenta</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Cabecera;
