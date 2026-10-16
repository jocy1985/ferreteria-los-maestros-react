import { useMemo, useState } from "react";
import { Badge, Container, Form, Table } from "react-bootstrap";
import { useProductos } from "../context/ProductosContext";
import { normalizarTexto } from "../utils/formato";

function Inventario() {
  const { productos } = useProductos();
  const [busqueda, setBusqueda] = useState("");

  const filtrados = useMemo(() => {
    const texto = normalizarTexto(busqueda);
    return productos.filter((producto) => normalizarTexto(`${producto.codigo} ${producto.nombre} ${producto.categoria}`).includes(texto));
  }, [productos, busqueda]);

  const stockBajo = productos.filter((producto) => producto.stock <= producto.stockMinimo).length;

  return (
    <Container className="py-5">
      <header className="mb-4">
        <p className="etiqueta">Vista interna</p>
        <h1>Inventario</h1>
        <p className="lead">Consulta el stock disponible y detecta productos que requieren reposición.</p>
      </header>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <Badge bg="dark" className="p-2">{productos.length} productos</Badge>
        <Badge bg={stockBajo ? "warning" : "success"} text={stockBajo ? "dark" : undefined} className="p-2">{stockBajo} con stock bajo</Badge>
      </div>

      <Form.Group controlId="buscar-inventario" className="mb-3">
        <Form.Label>Buscar por código, producto o categoría</Form.Label>
        <Form.Control type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Ejemplo: HE001, taladro o gasfitería" />
      </Form.Group>

      <p role="status" className="texto-suave">Mostrando {filtrados.length} producto(s).</p>

      <div className="table-responsive border rounded-3" tabIndex="0" aria-label="Tabla de inventario desplazable horizontalmente">
        <Table hover className="mb-0 align-middle">
          <caption className="visually-hidden">Stock de productos</caption>
          <thead>
            <tr><th scope="col">Código</th><th scope="col">Producto</th><th scope="col">Categoría</th><th scope="col">Stock</th><th scope="col">Mínimo</th><th scope="col">Estado</th></tr>
          </thead>
          <tbody>
            {filtrados.map((producto) => {
              const bajo = producto.stock <= producto.stockMinimo;
              return (
                <tr key={producto.codigo}>
                  <th scope="row">{producto.codigo}</th>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.stockMinimo}</td>
                  <td><Badge bg={bajo ? "warning" : "success"} text={bajo ? "dark" : undefined}>{bajo ? "Stock bajo" : "Disponible"}</Badge></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default Inventario;
