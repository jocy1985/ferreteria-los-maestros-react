import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSesion } from "../context/SesionContext";
import { normalizarCorreo, validarCorreo } from "../utils/validaciones";

function Login() {
  const { iniciarSesion } = useSesion();
  const navigate = useNavigate();
  const location = useLocation();
  const [formulario, setFormulario] = useState({ correo: "", clave: "", recordar: false });
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");

  function actualizarCampo(evento) {
    const { name, value, checked, type } = evento.target;
    setFormulario((actual) => ({ ...actual, [name]: type === "checkbox" ? checked : value }));
    setErrores((actual) => ({ ...actual, [name]: "" }));
    setErrorGeneral("");
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = {};

    if (!validarCorreo(formulario.correo)) {
      nuevosErrores.correo = "Ingresa un correo válido.";
    }

    if (!formulario.clave) {
      nuevosErrores.clave = "Ingresa tu contraseña.";
    }

    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const resultado = iniciarSesion(
      normalizarCorreo(formulario.correo),
      formulario.clave,
      formulario.recordar
    );

    if (!resultado.ok) {
      setErrorGeneral(resultado.mensaje);
      return;
    }

    const destinoPorRol = {
      Cliente: "/mi-cuenta",
      Empleado: "/empleado",
      Administrador: "/admin",
    };
    navigate(location.state?.desde || destinoPorRol[resultado.usuario?.rol] || "/", { replace: true });
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <Card className="shadow-sm border-0 tarjeta-formulario">
            <Card.Body className="p-4 p-lg-5">
              <p className="etiqueta">Acceso al sistema</p>
              <h1 className="h2 mb-3">Iniciar sesión</h1>
              <p className="texto-suave">
                Ingresa según tu rol para acceder a las funciones de cliente, empleado o administrador.
              </p>

              {location.state?.mensaje && <Alert variant="success">{location.state.mensaje}</Alert>}
              {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}

              <Form noValidate onSubmit={enviar}>
                <Form.Group className="mb-3" controlId="login-correo">
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

                <Form.Group className="mb-3" controlId="login-clave">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="clave"
                    value={formulario.clave}
                    onChange={actualizarCampo}
                    isInvalid={Boolean(errores.clave)}
                    autoComplete="current-password"
                  />
                  <Form.Control.Feedback type="invalid">{errores.clave}</Form.Control.Feedback>
                </Form.Group>

                <Form.Check
                  className="mb-4"
                  type="checkbox"
                  id="recordar-sesion"
                  name="recordar"
                  label="Recuérdame en este equipo"
                  checked={formulario.recordar}
                  onChange={actualizarCampo}
                />

                <Button type="submit" variant="warning" className="w-100 fw-semibold">
                  Iniciar sesión
                </Button>
              </Form>

              <hr className="my-4" />
              <p className="mb-2">
                ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
              </p>
              <p className="small texto-suave mb-0">
                Pruebas: cliente@losmaestros.cl / cliente123 · empleado@losmaestros.cl / empleado123 · admin@losmaestros.cl / admin123
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
