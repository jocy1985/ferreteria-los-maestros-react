import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function PiePagina() {
  return (
    <footer className="pie-sitio mt-auto">
      <Container>
        <Row className="g-4">
          <Col xs={12} md={4}>
            <strong>Ferretería Los Maestros</strong>
            <p className="mb-0">Proyecto académico DSY1104 · Desarrollo FullStack II.</p>
          </Col>
          <Col xs={12} md={4}>
            <strong>Atención</strong>
            <p className="mb-0">
              Lunes a viernes: 08:30 a 18:30 hrs
              <br />
              Sábado: 09:00 a 14:00 hrs
              <br />
              Domingo: cerrado
            </p>
          </Col>
          <Col xs={12} md={4}>
            <strong>Enlaces</strong>
            <p className="mb-0">
              <Link to="/catalogo">Catálogo</Link>
              <br />
              <Link to="/categorias">Categorías</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default PiePagina;
