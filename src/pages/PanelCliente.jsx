import { Badge, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSesion } from "../context/SesionContext";
import { formatearPrecio } from "../utils/formato";

function PanelCliente() {
  const { usuario } = useSesion();

  return (
    <Container className="py-5">
      <header className="mb-4">
        <p className="etiqueta">Mi cuenta</p>
        <h1>Hola, {usuario.nombre}</h1>
        <p className="lead texto-suave">
          Revisa tus datos de cliente y la información asociada a tus compras.
        </p>
      </header>

      <Row className="g-4 mb-5">
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Tipo de cliente</Card.Title>
              <p className="dato-panel">{usuario.tipoCliente}</p>
              <Badge bg="secondary">{usuario.rol}</Badge>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Cuenta corriente</Card.Title>
              <p className="dato-panel">{usuario.cuentaCorriente ? "Habilitada" : "No habilitada"}</p>
              <p className="texto-suave mb-0">
                {usuario.cuentaCorriente
                  ? "Tus compras con cuenta corriente pueden registrarse como saldo pendiente."
                  : "Consulta en tienda si necesitas solicitar una cuenta corriente."}
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Datos de contacto</Card.Title>
              <p className="mb-1">{usuario.correo}</p>
              <p className="mb-0">{usuario.telefono}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <section aria-labelledby="titulo-compras">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
          <div>
            <p className="etiqueta mb-1">Historial</p>
            <h2 id="titulo-compras" className="h3 mb-0">Compras recientes</h2>
          </div>
          <Link className="btn btn-dark" to="/catalogo">Ir al catálogo</Link>
        </div>

        <div className="table-responsive border rounded-3">
          <Table hover className="mb-0 align-middle">
            <thead>
              <tr>
                <th scope="col">Pedido</th>
                <th scope="col">Fecha</th>
                <th scope="col">Estado</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1042</td>
                <td>02-10-2026</td>
                <td><Badge bg="success">Entregado</Badge></td>
                <td>{formatearPrecio(28470)}</td>
              </tr>
              <tr>
                <td>#1037</td>
                <td>18-09-2026</td>
                <td><Badge bg="success">Entregado</Badge></td>
                <td>{formatearPrecio(16480)}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </Container>
  );
}

export default PanelCliente;
