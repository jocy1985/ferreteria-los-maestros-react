import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function PagoError() {
  return (
    <Container className="py-5">
      <div className="alert alert-danger mx-auto bloque-resultado-pago">
        <h1 className="h2">No se pudo procesar el pago</h1>
        <p>
          La compra no fue confirmada. Revisa tus datos o selecciona otra forma de pago antes de volver a intentarlo.
        </p>
        <div className="d-flex flex-wrap gap-2">
          <Button as={Link} to="/checkout" variant="danger">Volver al checkout</Button>
          <Button as={Link} to="/catalogo" variant="outline-dark">Volver al catálogo</Button>
        </div>
      </div>
    </Container>
  );
}

export default PagoError;
