import { Badge, Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatearPrecio } from "../utils/formato";

const CLAVE_ULTIMO_PEDIDO = "ferreteriaUltimoPedidoReact";

function leerPedido() {
  try {
    const texto = localStorage.getItem(CLAVE_ULTIMO_PEDIDO);
    return texto ? JSON.parse(texto) : null;
  } catch {
    return null;
  }
}

function textoFormaPago(valor) {
  const textos = {
    transferencia: "Transferencia bancaria",
    tarjeta: "Tarjeta",
    "cuenta-corriente": "Cuenta corriente",
  };
  return textos[valor] ?? valor;
}

function Confirmacion() {
  const pedido = leerPedido();

  if (!pedido) {
    return (
      <Container className="py-5">
        <div className="alert alert-warning">
          <h1 className="h3">No encontramos una compra reciente</h1>
          <p>Realiza una compra para visualizar su resumen.</p>
          <Button as={Link} to="/catalogo" variant="dark">Ir al catálogo</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="confirmacion-compra mx-auto">
        <div className="text-center mb-4">
          <div className="icono-exito" aria-hidden="true">✓</div>
          <p className="etiqueta">Compra registrada</p>
          <h1>Tu pedido fue recibido</h1>
          <p className="lead texto-suave">
            Número de pedido <strong>{pedido.numero}</strong>
          </p>
          <Badge bg="warning" text="dark">{pedido.estado}</Badge>
        </div>

        <Row className="g-4 mb-4">
          <Col xs={12} md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Cliente</Card.Title>
                <p className="mb-1">{pedido.cliente.nombre}</p>
                <p className="mb-1">{pedido.cliente.correo}</p>
                <p className="mb-0">{pedido.cliente.telefono}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Entrega y pago</Card.Title>
                <p className="mb-1">
                  {pedido.entrega === "retiro" ? "Retiro en tienda" : "Despacho a domicilio"}
                </p>
                {pedido.direccion && (
                  <p className="mb-1">
                    {pedido.direccion.calle} {pedido.direccion.numero}, {pedido.direccion.comuna}
                  </p>
                )}
                <p className="mb-0">{textoFormaPago(pedido.formaPago)}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="table-responsive border rounded-3 mb-4">
          <Table className="mb-0 align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th className="text-center">Cantidad</th>
                <th className="text-end">Precio</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {pedido.items.map((item) => (
                <tr key={item.codigo}>
                  <td>{item.nombre}</td>
                  <td className="text-center">{item.cantidad}</td>
                  <td className="text-end">{formatearPrecio(item.precioUnitario)}</td>
                  <td className="text-end">{formatearPrecio(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 resumen-total-compra">
          <strong className="fs-4">Total: {formatearPrecio(pedido.total)}</strong>
          <Button as={Link} to="/catalogo" variant="dark">Seguir comprando</Button>
        </div>
      </div>
    </Container>
  );
}

export default Confirmacion;
