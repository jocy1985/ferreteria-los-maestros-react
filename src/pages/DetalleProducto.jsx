import { useState } from "react";
import { Alert, Badge, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useProductos } from "../context/ProductosContext";
import { formatearPrecio } from "../utils/formato";

function DetalleProducto() {
  const { codigo } = useParams();
  const { buscarProducto } = useProductos();
  const { agregarProducto, mensaje } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const producto = buscarProducto(codigo);

  if (!producto) return <Container className="py-5"><Alert variant="warning"><h1 className="h3">Producto no encontrado</h1><p>No existe un producto con el código indicado.</p><Button as={Link} to="/catalogo" variant="dark">Volver al catálogo</Button></Alert></Container>;

  const stockBajo = producto.stock <= producto.stockMinimo;
  const enOferta = Boolean(producto.precioOferta);

  return (
    <Container className="py-5">
      <Button as={Link} to="/catalogo" variant="link" className="px-0 mb-3">← Volver al catálogo</Button>
      {mensaje && <Alert variant="info">{mensaje}</Alert>}
      <Row className="g-4 g-lg-5 align-items-start">
        <Col xs={12} lg={6}><img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded-4 border detalle-imagen" /></Col>
        <Col xs={12} lg={6}>
          <div className="d-flex flex-wrap gap-2 mb-3"><Badge bg="secondary">{producto.codigo}</Badge>{enOferta && <Badge bg="danger">Oferta</Badge>}<Badge bg={stockBajo ? "warning" : "success"} text={stockBajo ? "dark" : undefined}>{stockBajo ? "Stock bajo" : "Disponible"}</Badge></div>
          <h1>{producto.nombre}</h1><p className="lead texto-suave">{producto.marca} · {producto.categoria}</p><p>{producto.descripcion}</p>
          {enOferta ? <div className="mb-3"><p className="precio-anterior detalle mb-0">{formatearPrecio(producto.precio)}</p><p className="precio-detalle precio-oferta mb-0">{formatearPrecio(producto.precioOferta)} <small>/ {producto.unidad}</small></p></div> : <p className="precio-detalle">{formatearPrecio(producto.precio)} <small>/ {producto.unidad}</small></p>}
          <div className="detalle-stock p-3 rounded-3 mb-4"><strong>Stock disponible:</strong> {producto.stock} {producto.unidad}(s)<br /><span className="texto-suave">Stock mínimo de referencia: {producto.stockMinimo}</span></div>
          <div className="d-flex flex-wrap gap-2 align-items-end">
            <Form.Group controlId="cantidad-detalle"><Form.Label>Cantidad</Form.Label><Form.Control type="number" min="1" max={producto.stock} value={cantidad} onChange={(e) => setCantidad(Number(e.target.value) || 1)} style={{ width: "110px" }} /></Form.Group>
            <Button variant="warning" className="fw-semibold" disabled={producto.stock <= 0} onClick={() => agregarProducto(producto.codigo, cantidad)}>Agregar al pedido</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleProducto;
