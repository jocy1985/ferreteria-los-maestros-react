import { Badge, Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { useSesion } from "../context/SesionContext";

function PanelEmpleado() {
  const { usuario } = useSesion();
  const { productos } = useProductos();
  const stockBajo = productos.filter((producto) => producto.stock <= producto.stockMinimo).length;

  return (
    <Container className="py-5">
      <header className="mb-4"><p className="etiqueta">Vendedor / Empleado</p><h1>Panel de trabajo</h1><p className="lead">Hola, {usuario.nombre}. Revisa pedidos e inventario.</p></header>

      <Row className="g-4 mb-5">
        <Col xs={12} md={4}><Card className="h-100 shadow-sm"><Card.Body><span className="dato-grande">4</span><Card.Title>Pedidos pendientes</Card.Title></Card.Body></Card></Col>
        <Col xs={12} md={4}><Card className="h-100 shadow-sm"><Card.Body><span className="dato-grande">{stockBajo}</span><Card.Title>Productos con stock bajo</Card.Title></Card.Body></Card></Col>
        <Col xs={12} md={4}><Card className="h-100 shadow-sm"><Card.Body><span className="dato-grande">7</span><Card.Title>Ventas registradas hoy</Card.Title></Card.Body></Card></Col>
      </Row>

      <div className="d-flex flex-wrap justify-content-between gap-3 align-items-center mb-3"><h2 className="h3 mb-0">Pedidos recientes</h2><Button as={Link} to="/inventario" variant="warning" className="fw-semibold">Revisar inventario</Button></div>
      <div className="table-responsive border rounded-3">
        <Table hover className="mb-0 align-middle"><thead><tr><th>Pedido</th><th>Cliente</th><th>Entrega</th><th>Estado</th></tr></thead><tbody>
          <tr><td>#1048</td><td>Constructora Norte</td><td>Retiro</td><td><Badge bg="primary">En preparación</Badge></td></tr>
          <tr><td>#1047</td><td>Cliente particular</td><td>Despacho</td><td><Badge bg="warning" text="dark">Pendiente</Badge></td></tr>
          <tr><td>#1046</td><td>Maestro Carlos</td><td>Retiro</td><td><Badge bg="success">Listo para retiro</Badge></td></tr>
        </tbody></Table>
      </div>
    </Container>
  );
}

export default PanelEmpleado;
