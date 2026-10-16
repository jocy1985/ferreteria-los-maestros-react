import { useMemo, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSesion } from "../context/SesionContext";
import { useProductos } from "../context/ProductosContext";
import { useCarrito } from "../context/CarritoContext";
import { formatearPrecio } from "../utils/formato";
import { validarCheckout } from "../utils/validaciones";

const CLAVE_ULTIMO_PEDIDO = "ferreteriaUltimoPedidoReact";

function Checkout() {
  const { usuario } = useSesion();
  const { productos } = useProductos();
  const { carrito, vaciarCarrito } = useCarrito();
  const navigate = useNavigate();
  const [errores, setErrores] = useState({});
  const [formulario, setFormulario] = useState({
    nombre: usuario?.nombre ?? "",
    correo: usuario?.correo ?? "",
    telefono: usuario?.telefono ?? "",
    entrega: "retiro",
    calle: "",
    numero: "",
    comuna: "La Serena",
    indicaciones: "",
    formaPago: usuario?.cuentaCorriente ? "cuenta-corriente" : "transferencia",
  });

  const items = useMemo(() => {
    return carrito
      .map((item) => {
        const producto = productos.find((actual) => actual.codigo === item.codigo);
        if (!producto) return null;
        const cantidad = Number(item.cantidad) || 0;
        const precioUnitario = producto.precioOferta ?? producto.precio;
        return { ...item, producto, cantidad, precioUnitario, subtotal: precioUnitario * cantidad };
      })
      .filter(Boolean)
      .filter((item) => item.cantidad > 0);
  }, [carrito, productos]);

  const total = items.reduce((acumulado, item) => acumulado + item.subtotal, 0);

  function actualizarCampo(evento) {
    const { name, value } = evento.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
    setErrores((actual) => ({ ...actual, [name]: "" }));
  }

  function procesarCompra(evento) {
    evento.preventDefault();
    const nuevosErrores = validarCheckout(formulario);

    if (items.length === 0) {
      nuevosErrores.carrito = "Agrega al menos un producto antes de continuar con la compra.";
    }

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const pedido = {
      numero: `LM-${Date.now().toString().slice(-8)}`,
      fecha: new Date().toISOString(),
      cliente: {
        nombre: formulario.nombre.trim(),
        correo: formulario.correo.trim(),
        telefono: formulario.telefono.trim(),
      },
      entrega: formulario.entrega,
      direccion:
        formulario.entrega === "despacho"
          ? {
              calle: formulario.calle.trim(),
              numero: formulario.numero.trim(),
              comuna: formulario.comuna.trim(),
              indicaciones: formulario.indicaciones.trim(),
            }
          : null,
      formaPago: formulario.formaPago,
      items: items.map((item) => ({
        codigo: item.producto.codigo,
        nombre: item.producto.nombre,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
        subtotal: item.subtotal,
      })),
      total,
      estado: "Recibido - pendiente de confirmación",
    };

    localStorage.setItem(CLAVE_ULTIMO_PEDIDO, JSON.stringify(pedido));
    vaciarCarrito();
    navigate("/compra-exitosa");
  }

  return (
    <Container className="py-5">
      <header className="mb-4">
        <p className="etiqueta">Finalizar compra</p>
        <h1>Checkout</h1>
        <p className="lead">Confirma tus productos, datos de contacto y opción de entrega.</p>
      </header>

      {errores.carrito && <Alert variant="warning">{errores.carrito}</Alert>}

      <Row className="g-4">
        <Col xs={12} lg={7}>
          <Form noValidate onSubmit={procesarCompra}>
            <Card className="shadow-sm mb-4">
              <Card.Body className="p-4">
                <h2 className="h4">Información del cliente</h2>
                {usuario && (
                  <Alert variant="light" className="border">
                    Tus datos de sesión se completaron automáticamente. Puedes ajustarlos para este pedido.
                  </Alert>
                )}
                <Row className="g-3">
                  <Col xs={12}>
                    <Form.Group controlId="checkout-nombre">
                      <Form.Label>Nombre completo</Form.Label>
                      <Form.Control
                        name="nombre"
                        value={formulario.nombre}
                        onChange={actualizarCampo}
                        isInvalid={Boolean(errores.nombre)}
                      />
                      <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="checkout-correo">
                      <Form.Label>Correo</Form.Label>
                      <Form.Control
                        type="email"
                        name="correo"
                        value={formulario.correo}
                        onChange={actualizarCampo}
                        isInvalid={Boolean(errores.correo)}
                      />
                      <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="checkout-telefono">
                      <Form.Label>Celular</Form.Label>
                      <Form.Control
                        name="telefono"
                        value={formulario.telefono}
                        onChange={actualizarCampo}
                        isInvalid={Boolean(errores.telefono)}
                      />
                      <Form.Control.Feedback type="invalid">{errores.telefono}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
              <Card.Body className="p-4">
                <h2 className="h4">Entrega</h2>
                <div className="d-flex flex-column gap-2 mb-3">
                  <Form.Check
                    type="radio"
                    id="entrega-retiro"
                    name="entrega"
                    value="retiro"
                    label="Retiro en tienda"
                    checked={formulario.entrega === "retiro"}
                    onChange={actualizarCampo}
                  />
                  <Form.Check
                    type="radio"
                    id="entrega-despacho"
                    name="entrega"
                    value="despacho"
                    label="Despacho a domicilio"
                    checked={formulario.entrega === "despacho"}
                    onChange={actualizarCampo}
                  />
                </div>

                {formulario.entrega === "despacho" && (
                  <Row className="g-3">
                    <Col xs={12} md={7}>
                      <Form.Group controlId="checkout-calle">
                        <Form.Label>Calle</Form.Label>
                        <Form.Control
                          name="calle"
                          value={formulario.calle}
                          onChange={actualizarCampo}
                          isInvalid={Boolean(errores.calle)}
                        />
                        <Form.Control.Feedback type="invalid">{errores.calle}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={5}>
                      <Form.Group controlId="checkout-numero">
                        <Form.Label>Número</Form.Label>
                        <Form.Control
                          name="numero"
                          value={formulario.numero}
                          onChange={actualizarCampo}
                          isInvalid={Boolean(errores.numero)}
                        />
                        <Form.Control.Feedback type="invalid">{errores.numero}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group controlId="checkout-comuna">
                        <Form.Label>Comuna</Form.Label>
                        <Form.Control
                          name="comuna"
                          value={formulario.comuna}
                          onChange={actualizarCampo}
                          isInvalid={Boolean(errores.comuna)}
                        />
                        <Form.Control.Feedback type="invalid">{errores.comuna}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group controlId="checkout-indicaciones">
                        <Form.Label>Indicaciones para la entrega (opcional)</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="indicaciones"
                          value={formulario.indicaciones}
                          onChange={actualizarCampo}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
              <Card.Body className="p-4">
                <h2 className="h4">Forma de pago</h2>
                <Form.Select
                  name="formaPago"
                  value={formulario.formaPago}
                  onChange={actualizarCampo}
                  isInvalid={Boolean(errores.formaPago)}
                >
                  <option value="transferencia">Transferencia bancaria</option>
                  <option value="tarjeta">Tarjeta</option>
                  {usuario?.cuentaCorriente && (
                    <option value="cuenta-corriente">Cuenta corriente</option>
                  )}
                </Form.Select>
                <Form.Control.Feedback type="invalid">{errores.formaPago}</Form.Control.Feedback>
                <p className="small texto-suave mt-2 mb-0">
                  La forma de pago seleccionada quedará registrada en el resumen del pedido.
                </p>
              </Card.Body>
            </Card>

            <Button type="submit" variant="warning" size="lg" className="fw-semibold">
              Confirmar compra
            </Button>
          </Form>
        </Col>

        <Col xs={12} lg={5}>
          <Card className="shadow-sm resumen-checkout sticky-lg-top">
            <Card.Body className="p-4">
              <h2 className="h4">Resumen del pedido</h2>
              {items.length === 0 ? (
                <div>
                  <p className="texto-suave">No hay productos en tu pedido.</p>
                  <Button as={Link} to="/catalogo" variant="outline-dark">
                    Agregar productos
                  </Button>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table size="sm" className="align-middle">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th className="text-center">Cant.</th>
                        <th className="text-end">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.producto.codigo}>
                          <td>{item.producto.nombre}</td>
                          <td className="text-center">{item.cantidad}</td>
                          <td className="text-end">{formatearPrecio(item.subtotal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="d-flex justify-content-between fs-5 fw-bold border-top pt-3">
                    <span>Total</span>
                    <span>{formatearPrecio(total)}</span>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
