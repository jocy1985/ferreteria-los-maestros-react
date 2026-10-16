import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";

function Inicio() {
  const { categorias, productos } = useProductos();
  const destacados = [productos[0], productos[4], productos[2]].filter(Boolean);

  return (
    <>
      <section className="hero-react">
        <Container>
          <Row className="align-items-center g-4 py-5">
            <Col xs={12} lg={6}>
              <p className="etiqueta">Materiales y herramientas</p>
              <h1 className="display-5 fw-bold">Todo para hacer bien el trabajo</h1>
              <p className="lead">
                Consulta productos, precios y stock antes de venir a la ferretería. Una experiencia
                simple pensada para maestros, contratistas y clientes particulares.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Button as={Link} to="/catalogo" variant="warning" size="lg" className="fw-semibold">
                  Ver productos
                </Button>
                <Button href="#ubicacion" variant="outline-light" size="lg">
                  Ver ubicación
                </Button>
              </div>
            </Col>
            <Col xs={12} lg={6}>
              <img
                src="/assets/img/portada-herramientas.jpg"
                alt="Caja de herramientas con llaves, dados y destornilladores"
                className="img-fluid rounded-4 shadow hero-imagen"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 seccion-categorias-inicio">
        <Container>
          <p className="etiqueta">Comprar por categoría</p>
          <h2 className="mb-4">Encuentra más rápido lo que necesitas</h2>
          <Row className="g-3">
            {categorias.map((categoria) => {
              const cantidad = productos.filter((producto) => producto.categoria === categoria).length;

              return (
                <Col xs={12} sm={6} lg={3} key={categoria}>
                  <Card className="h-100 shadow-sm tarjeta-categoria-inicio">
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="h5">{categoria}</Card.Title>
                      <Card.Text className="texto-suave">
                        {cantidad} producto{cantidad === 1 ? "" : "s"} disponible{cantidad === 1 ? "" : "s"}.
                      </Card.Text>
                      <Button
                        as={Link}
                        to={`/catalogo?categoria=${encodeURIComponent(categoria)}`}
                        variant="outline-dark"
                        className="mt-auto"
                      >
                        Ver en catálogo
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <p className="etiqueta">Productos destacados</p>
          <h2 className="mb-4">Productos destacados</h2>
          <Row className="g-4">
            {destacados.map((producto) => (
              <Col xs={12} md={6} lg={4} key={producto.codigo}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="imagen-destacada"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{producto.nombre}</Card.Title>
                    <Card.Text className="texto-suave">{producto.descripcion}</Card.Text>
                    <Button
                      as={Link}
                      to={`/producto/${producto.codigo}`}
                      variant="dark"
                      className="mt-auto"
                    >
                      Ver detalle
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="seccion-suave py-5">
        <Container>
          <p className="etiqueta">¿Necesitas ayuda?</p>
          <h2 className="mb-4">Contáctanos si tienes dudas</h2>
          <Row className="g-4">
            <Col xs={12} md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title>Llámanos</Card.Title>
                  <Card.Text>Confirma stock, medidas o disponibilidad antes de venir.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title>Haz tu consulta</Card.Title>
                  <Card.Text>Cuéntanos qué producto necesitas y te orientamos.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <Card.Title>Visítanos</Card.Title>
                  <Card.Text>Atención directa en Avenida Balmaceda 2100, La Serena.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="ubicacion" className="py-5">
        <Container>
          <p className="etiqueta">Información útil</p>
          <h2 className="mb-4">Ubicación y seguridad</h2>
          <Row className="g-4">
            <Col xs={12} lg={6}>
              <div className="h-100 p-4 border rounded-4">
                <h3 className="h4">Ubicación de la ferretería</h3>
                <img
                  src="/assets/img/mapa-ferreteria-googlemaps.png"
                  alt="Mapa con la ubicación de la ferretería en Avenida Balmaceda, La Serena"
                  className="img-fluid rounded-3 mb-3 mapa-imagen-react"
                />
                <p className="texto-suave">Avenida Balmaceda 2100, La Serena.</p>
                <a
                  href="https://www.google.com/maps?q=Avenida+Balmaceda+2100,+La+Serena,+Chile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver ubicación en Google Maps
                </a>
              </div>
            </Col>
            <Col xs={12} lg={6}>
              <div className="h-100 p-4 border rounded-4">
                <h3 className="h4">Seguridad en el trabajo</h3>
                <video className="w-100 rounded-3 mb-3" controls preload="metadata">
                  <source src="/assets/video/seguridad-herramientas-manuales.mp4" type="video/mp4" />
                  Tu navegador no permite reproducir el video.
                </video>
                <p className="texto-suave mb-0">
                  Recomendaciones de prevención de riesgos en el manejo de herramientas manuales.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Inicio;
