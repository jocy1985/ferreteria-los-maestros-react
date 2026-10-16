import { Navigate, useLocation } from "react-router-dom";
import { useSesion } from "../context/SesionContext";

function RutaCliente({ children }) {
  const { usuario } = useSesion();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  }

  if (usuario.rol !== "Cliente") {
    return <Navigate to={usuario.rol === "Administrador" ? "/admin" : "/empleado"} replace />;
  }

  return children;
}

export default RutaCliente;
