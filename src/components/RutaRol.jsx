import { Navigate, useLocation } from "react-router-dom";
import { useSesion } from "../context/SesionContext";

function RutaRol({ roles, children }) {
  const { usuario } = useSesion();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  }

  if (!roles.includes(usuario.rol)) {
    return <Navigate to={usuario.rol === "Cliente" ? "/mi-cuenta" : "/"} replace />;
  }

  return children;
}

export default RutaRol;
