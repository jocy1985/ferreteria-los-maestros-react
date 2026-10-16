import { Col, Container, Row } from "react-bootstrap";
import ProductoCard from "../components/ProductoCard";
import { useProductos } from "../context/ProductosContext";

function Ofertas() {
  const { productos } = useProductos();
  const productosEnOferta = productos.filter((producto) => producto.precioOferta);
  return <Container className="py-5"><header className="mb-4"><p className="etiqueta">Precios especiales</p><h1>Ofertas</h1><p className="lead">Productos seleccionados con precio promocional.</p></header><Row className="g-4">{productosEnOferta.map((producto) => <Col xs={12} md={6} lg={4} key={producto.codigo}><ProductoCard producto={producto} /></Col>)}</Row></Container>;
}

export default Ofertas;
