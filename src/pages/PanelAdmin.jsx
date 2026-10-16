import { useState } from "react";
import { Alert, Badge, Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { useSesion } from "../context/SesionContext";

const formularioInicial = { codigo: "", nombre: "", categoria: "", marca: "", unidad: "unidad", precio: "", precioOferta: "", stock: "", stockMinimo: "", descripcion: "", imagen: "" };

function PanelAdmin() {
  const { usuario } = useSesion();
  const { productos, crearProducto, actualizarProducto, eliminarProducto, restablecerProductos } = useProductos();
  const [formulario, setFormulario] = useState(formularioInicial);
  const [editando, setEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const stockBajo = productos.filter((producto) => producto.stock <= producto.stockMinimo).length;

  function abrirNuevo() { setEditando(null); setFormulario(formularioInicial); setError(""); setMostrarModal(true); }
  function abrirEditar(producto) { setEditando(producto.codigo); setFormulario({ ...producto, precioOferta: producto.precioOferta ?? "" }); setError(""); setMostrarModal(true); }
  function actualizarCampo(e) { setFormulario((actual) => ({ ...actual, [e.target.name]: e.target.value })); }

  function guardar(e) {
    e.preventDefault();
    if (!formulario.codigo.trim() || !formulario.nombre.trim() || !formulario.categoria.trim() || !formulario.marca.trim() || Number(formulario.precio) <= 0 || Number(formulario.stock) < 0 || Number(formulario.stockMinimo) < 0) {
      setError("Completa los campos obligatorios y utiliza valores numéricos válidos.");
      return;
    }
    const resultado = editando ? actualizarProducto(editando, formulario) : crearProducto(formulario);
    if (!resultado.ok) { setError(resultado.mensaje); return; }
    setMostrarModal(false);
    setMensaje(editando ? "Producto actualizado correctamente." : "Producto creado correctamente.");
  }

  function borrar(producto) {
    if (!window.confirm(`¿Eliminar ${producto.nombre}?`)) return;
    const resultado = eliminarProducto(producto.codigo);
    setMensaje(resultado.ok ? "Producto eliminado correctamente." : resultado.mensaje);
  }

  return (
    <Container className="py-5">
      <header className="mb-4"><p className="etiqueta">Administrador</p><h1>Panel de administración</h1><p className="lead">Hola, {usuario.nombre}. Gestiona productos e inventario de la tienda.</p></header>

      {mensaje && <Alert variant="success" onClose={() => setMensaje("")} dismissible>{mensaje}</Alert>}

      <Row className="g-4 mb-5">
        <Col xs={12} md={4}><Card className="h-100 shadow-sm"><Card.Body><span className="dato-grande">{productos.length}</span><Card.Title>Productos</Card.Title></Card.Body></Card></Col>
        <Col xs={12} md={4}><Card className="h-100 shadow-sm"><Card.Body><span className="dato-grande">{stockBajo}</span><Card.Title>Alertas de stock</Card.Title></Card.Body></Card></Col>
        <Col xs={12} md={4}><Card className="h-100 shadow-sm"><Card.Body><span className="dato-grande">3</span><Card.Title>Roles disponibles</Card.Title><p className="texto-suave mb-0">Cliente, Empleado y Administrador</p></Card.Body></Card></Col>
      </Row>

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div><p className="etiqueta mb-1">CRUD</p><h2 className="h3 mb-0">Gestión de productos</h2></div>
        <div className="d-flex flex-wrap gap-2"><Button as={Link} to="/inventario" variant="outline-dark">Ver inventario</Button><Button variant="outline-secondary" onClick={() => { restablecerProductos(); setMensaje("Catálogo restablecido a sus datos iniciales."); }}>Restablecer</Button><Button variant="warning" className="fw-semibold" onClick={abrirNuevo}>Nuevo producto</Button></div>
      </div>

      <div className="table-responsive border rounded-3">
        <Table hover className="mb-0 align-middle"><thead><tr><th>Código</th><th>Producto</th><th>Stock</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>
          {productos.map((producto) => { const bajo = producto.stock <= producto.stockMinimo; return <tr key={producto.codigo}><th>{producto.codigo}</th><td>{producto.nombre}<div className="small texto-suave">{producto.categoria}</div></td><td>{producto.stock}</td><td><Badge bg={bajo ? "warning" : "success"} text={bajo ? "dark" : undefined}>{bajo ? "Stock bajo" : "Disponible"}</Badge></td><td><div className="d-flex flex-wrap gap-2"><Button size="sm" variant="outline-primary" onClick={() => abrirEditar(producto)}>Editar</Button><Button size="sm" variant="outline-danger" onClick={() => borrar(producto)}>Eliminar</Button></div></td></tr>; })}
        </tbody></Table>
      </div>

      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} size="lg" centered>
        <Form onSubmit={guardar} noValidate>
          <Modal.Header closeButton><Modal.Title>{editando ? "Editar producto" : "Nuevo producto"}</Modal.Title></Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row className="g-3">
              <Col xs={12} md={4}><Form.Group><Form.Label>Código *</Form.Label><Form.Control name="codigo" value={formulario.codigo} onChange={actualizarCampo} disabled={Boolean(editando)} /></Form.Group></Col>
              <Col xs={12} md={8}><Form.Group><Form.Label>Nombre *</Form.Label><Form.Control name="nombre" value={formulario.nombre} onChange={actualizarCampo} /></Form.Group></Col>
              <Col xs={12} md={6}><Form.Group><Form.Label>Categoría *</Form.Label><Form.Control name="categoria" value={formulario.categoria} onChange={actualizarCampo} /></Form.Group></Col>
              <Col xs={12} md={6}><Form.Group><Form.Label>Marca *</Form.Label><Form.Control name="marca" value={formulario.marca} onChange={actualizarCampo} /></Form.Group></Col>
              <Col xs={12} md={4}><Form.Group><Form.Label>Unidad</Form.Label><Form.Control name="unidad" value={formulario.unidad} onChange={actualizarCampo} /></Form.Group></Col>
              <Col xs={12} md={4}><Form.Group><Form.Label>Precio *</Form.Label><Form.Control type="number" min="1" name="precio" value={formulario.precio} onChange={actualizarCampo} /></Form.Group></Col>
              <Col xs={12} md={4}><Form.Group><Form.Label>Precio oferta</Form.Label><Form.Control type="number" min="1" name="precioOferta" value={formulario.precioOferta} onChange={actualizarCampo} /></Form.Group></Col>
              <Col xs={12} md={6}><Form.Group><Form.Label>Stock *</Form.Label><Form.Control type="number" min="0" name="stock" value={formulario.stock} onChange={actualizarCampo} /></Form.Group></Col>
              <Col xs={12} md={6}><Form.Group><Form.Label>Stock mínimo *</Form.Label><Form.Control type="number" min="0" name="stockMinimo" value={formulario.stockMinimo} onChange={actualizarCampo} /></Form.Group></Col>
              <Col xs={12}><Form.Group><Form.Label>Descripción</Form.Label><Form.Control as="textarea" rows={2} name="descripcion" value={formulario.descripcion} onChange={actualizarCampo} /></Form.Group></Col>
            </Row>
          </Modal.Body>
          <Modal.Footer><Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button><Button type="submit" variant="warning" className="fw-semibold">Guardar</Button></Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default PanelAdmin;
