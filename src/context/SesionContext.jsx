import { createContext, useContext, useMemo, useState } from "react";
import {
  CLAVE_SESION,
  buscarUsuarioPorCorreo,
  guardarUsuariosRegistrados,
  obtenerUsuariosRegistrados,
} from "../data/usuarios";
import { normalizarCorreo } from "../utils/validaciones";

const SesionContext = createContext(null);

function leerSesionInicial() {
  try {
    const texto = localStorage.getItem(CLAVE_SESION) ?? sessionStorage.getItem(CLAVE_SESION);
    return texto ? JSON.parse(texto) : null;
  } catch {
    return null;
  }
}

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesionInicial);

  function iniciarSesion(correo, clave, recordar) {
    const encontrado = buscarUsuarioPorCorreo(correo);

    if (!encontrado || encontrado.clave !== clave) {
      return { ok: false, mensaje: "Correo o contraseña incorrectos." };
    }

    const sesion = {
      id: encontrado.id,
      nombre: encontrado.nombre,
      rut: encontrado.rut,
      correo: encontrado.correo,
      telefono: encontrado.telefono,
      rol: encontrado.rol,
      tipoCliente: encontrado.tipoCliente,
      cuentaCorriente: Boolean(encontrado.cuentaCorriente),
    };

    localStorage.removeItem(CLAVE_SESION);
    sessionStorage.removeItem(CLAVE_SESION);

    const almacenamiento = recordar ? localStorage : sessionStorage;
    almacenamiento.setItem(CLAVE_SESION, JSON.stringify(sesion));
    setUsuario(sesion);

    return { ok: true, usuario: sesion };
  }

  function registrarUsuario(datos) {
    if (buscarUsuarioPorCorreo(datos.correo)) {
      return { ok: false, mensaje: "Ya existe una cuenta asociada a ese correo." };
    }

    const usuarios = obtenerUsuariosRegistrados();
    const nuevoUsuario = {
      id: `cliente-${Date.now()}`,
      nombre: datos.nombre.trim(),
      rut: datos.rut.trim(),
      correo: normalizarCorreo(datos.correo),
      telefono: datos.telefono.trim(),
      clave: datos.clave,
      rol: "Cliente",
      tipoCliente: datos.tipoCliente,
      cuentaCorriente: false,
    };

    guardarUsuariosRegistrados([...usuarios, nuevoUsuario]);
    return { ok: true };
  }

  function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
    sessionStorage.removeItem(CLAVE_SESION);
    setUsuario(null);
  }

  const valor = useMemo(
    () => ({ usuario, iniciarSesion, registrarUsuario, cerrarSesion }),
    [usuario]
  );

  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>;
}

export function useSesion() {
  const contexto = useContext(SesionContext);

  if (!contexto) {
    throw new Error("useSesion debe utilizarse dentro de SesionProvider");
  }

  return contexto;
}
