import { Outlet } from "react-router-dom";
import Cabecera from "./Cabecera";
import PiePagina from "./PiePagina";

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <a className="salto-contenido" href="#contenido-principal">
        Saltar al contenido principal
      </a>
      <Cabecera />
      <main id="contenido-principal" className="flex-grow-1">
        <Outlet />
      </main>
      <PiePagina />
    </div>
  );
}

export default Layout;
