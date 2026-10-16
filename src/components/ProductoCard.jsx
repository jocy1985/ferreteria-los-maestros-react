import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { formatearPrecio } from "../utils/formato";

function ProductoCard({ producto }) {
  const { agregarProducto } = useCarrito();
  const stockBajo = producto.stock <= producto.stockMinimo;
  const enOferta = Boolean(producto.precioOferta);

  return (
    <Card className="h-100 tarjeta-producto shadow-sm">
      <div className="position-relative">
        <Card.Img variant="top" src={producto.imagen} alt={producto.nombre} className="imagen-producto-react" />
        {enOferta && <Badge bg="danger" className="badge-oferta">Oferta</Badge>}
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <Badge bg="secondary">{producto.codigo}</Badge>
          <Badge bg={stockBajo ? "warning" : "success"} text={stockBajo ? "dark" : undefined}>
            {stockBajo ? "Stock bajo" : `Stock: ${producto.stock}`}
          </Badge>
        </div>
        <Card.Title as="h2" className="h5">{producto.nombre}</Card.Title>
        <Card.Text className="texto-suave mb-2">{producto.marca} · {producto.categoria}</Card.Text>
        {enOferta ? (
          <div className="mb-3"><p className="precio-anterior mb-0">{formatearPrecio(producto.precio)}</p><p className="precio-producto precio-oferta mb-0">{formatearPrecio(producto.precioOferta)} <small>/ {producto.unidad}</small></p></div>
        ) : (
          <p className="precio-producto mb-3">{formatearPrecio(producto.precio)} <small>/ {producto.unidad}</small></p>
        )}
        <div className="d-grid gap-2 mt-auto">
          <Button variant="warning" className="fw-semibold" disabled={producto.stock <= 0} onClick={() => agregarProducto(producto.codigo)}>{producto.stock <= 0 ? "Sin stock" : "Agregar al pedido"}</Button>
          <Button as={Link} to={`/producto/${producto.codigo}`} variant="outline-dark">Ver detalle</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductoCard;
