import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function PaginaNoEncontrada() {
  return (
    <Container className="py-5 text-center">
      <p className="display-1 fw-bold mb-0">404</p>
      <h1>Página no encontrada</h1>
      <p className="texto-suave">La dirección solicitada no corresponde a una vista disponible.</p>
      <Button as={Link} to="/" variant="warning" className="fw-semibold">
        Volver al inicio
      </Button>
    </Container>
  );
}

export default PaginaNoEncontrada;
