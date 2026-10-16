import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSesion } from "../context/SesionContext";
import { validarRegistro } from "../utils/validaciones";

const inicial = {
  nombre: "",
  rut: "",
  correo: "",
  telefono: "",
  tipoCliente: "",
  clave: "",
  repetirClave: "",
};

function Registro() {
  const { registrarUsuario } = useSesion();
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");

  function actualizarCampo(evento) {
    const { name, value } = evento.target;
    setFormulario((actual) => ({ ...actual, [name]: value }));
    setErrores((actual) => ({ ...actual, [name]: "" }));
    setErrorGeneral("");
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validarRegistro(formulario);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    const resultado = registrarUsuario(formulario);

    if (!resultado.ok) {
      setErrorGeneral(resultado.mensaje);
      return;
    }

    navigate("/login", {
      replace: true,
      state: { mensaje: "Cuenta creada correctamente. Ya puedes iniciar sesión." },
    });
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          <Card className="shadow-sm border-0 tarjeta-formulario">
            <Card.Body className="p-4 p-lg-5">
              <p className="etiqueta">Registro de cliente</p>
              <h1 className="h2 mb-3">Crear cuenta</h1>
              <p className="texto-suave">
                Registra tus datos para reutilizarlos en futuras compras y consultar tu información de cliente.
              </p>

              {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}

              <Form noValidate onSubmit={enviar}>
                <Row className="g-3">
                  <Col xs={12} md={6}>
                    <Form.Group controlId="registro-nombre">
                      <Form.Label>Nombre completo</Form.Label>
                      <Form.Control
                        name="nombre"
                        value={formulario.nombre}
                        onChange={actualizarCampo}
                        isInvalid={Boolean(errores.nombre)}
                        autoComplete="name"
                      />
                      <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group controlId="registro-rut">
                      <Form.Label>RUT</Form.Label>
                      <Form.Control
                        name="rut"
                        placeholder="12.345.678-5"
                        value={formulario.rut}
                        onChange={actualizarCampo}
                        isInvalid={Boolean(errores.rut)}
                      />
                      <Form.Control.Feedback type="invalid">{errores.rut}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group controlId="registro-correo">
                      <Form.Label>Correo</Form.Label>
                      <Form.Control
                        type="email"
                        name="correo"
                        value={formulario.correo}
                        onChange={actualizarCampo}
                        isInvalid={Boolean(errores.correo)}
                        autoComplete="email"
                      />
                      <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group controlId="registro-telefono">
                      <Form.Label>Celular</Form.Label>
                      <Form.Control
                        name="telefono"
                        placeholder="9 1234 5678"
                        value={formulario.telefono}
                        onChange={actualizarCampo}
                        isInvalid={Boolean(errores.telefono)}
                        autoComplete="tel"
                      />
                      <Form.Control.Feedback type="invalid">{errores.telefono}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Form.Group controlId="registro-tipo">
                      <Form.Label>Tipo de cliente</Form.Label>
                      <Form.Select
                        name="tipoCliente"
                        value={formulario.tipoCliente}
                        onChange={actualizarCampo}
                        isInvalid={Boolean(errores.tipoCliente)}
                      >
                        <option value="">Seleccionar</option>
                        <option value="Particular">Particular</option>
                        <option value="Contratista / Maestro de obra">Contratista / Maestro de obra</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errores.tipoCliente}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group controlId="registro-clave">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        name="clave"
                        value={formulario.clave}
                        onChange={actualizarCampo}
                        isInvalid={Boolean(errores.clave)}
                        autoComplete="new-password"
                      />
                      <Form.Control.Feedback type="invalid">{errores.clave}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col xs={12} md={6}>
                    <Form.Group controlId="registro-repetir-clave">
                      <Form.Label>Repetir contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        name="repetirClave"
                        value={formulario.repetirClave}
                        onChange={actualizarCampo}
                        isInvalid={Boolean(errores.repetirClave)}
                        autoComplete="new-password"
                      />
                      <Form.Control.Feedback type="invalid">{errores.repetirClave}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" variant="warning" className="mt-4 fw-semibold">
                  Crear cuenta
                </Button>
              </Form>

              <p className="mt-4 mb-0">
                ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Registro;
