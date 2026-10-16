import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import RutaCliente from "./components/RutaCliente";
import RutaRol from "./components/RutaRol";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Categorias from "./pages/Categorias";
import DetalleProducto from "./pages/DetalleProducto";
import Ofertas from "./pages/Ofertas";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import PanelCliente from "./pages/PanelCliente";
import Checkout from "./pages/Checkout";
import Confirmacion from "./pages/Confirmacion";
import PagoError from "./pages/PagoError";
import Carrito from "./pages/Carrito";
import Inventario from "./pages/Inventario";
import PanelEmpleado from "./pages/PanelEmpleado";
import PanelAdmin from "./pages/PanelAdmin";
import PaginaNoEncontrada from "./pages/PaginaNoEncontrada";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/producto/:codigo" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<Confirmacion />} />
        <Route path="/pago-error" element={<PagoError />} />
        <Route path="/mi-cuenta" element={<RutaCliente><PanelCliente /></RutaCliente>} />
        <Route path="/empleado" element={<RutaRol roles={["Empleado", "Administrador"]}><PanelEmpleado /></RutaRol>} />
        <Route path="/inventario" element={<RutaRol roles={["Empleado", "Administrador"]}><Inventario /></RutaRol>} />
        <Route path="/admin" element={<RutaRol roles={["Administrador"]}><PanelAdmin /></RutaRol>} />
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default App;
