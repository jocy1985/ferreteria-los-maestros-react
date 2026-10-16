import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";

function Categorias() {
  const { categorias, productos } = useProductos();
  return (
    <Container className="py-5">
      <header className="mb-4"><p className="etiqueta">Navegación por categoría</p><h1>Categorías</h1><p className="lead">Selecciona un rubro para abrir el catálogo ya filtrado.</p></header>
      <Row className="g-4">
        {categorias.map((categoria) => { const cantidad = productos.filter((p) => p.categoria === categoria).length; return <Col xs={12} sm={6} lg={4} key={categoria}><Card className="h-100 shadow-sm tarjeta-categoria"><Card.Body className="d-flex flex-column"><Card.Title>{categoria}</Card.Title><Card.Text className="texto-suave">{cantidad} producto{cantidad === 1 ? "" : "s"} disponible{cantidad === 1 ? "" : "s"}.</Card.Text><Link className="btn btn-warning fw-semibold mt-auto" to={`/catalogo?categoria=${encodeURIComponent(categoria)}`}>Ver productos</Link></Card.Body></Card></Col>; })}
      </Row>
    </Container>
  );
}

export default Categorias;
