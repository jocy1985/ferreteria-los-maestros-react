export const USUARIOS_DEMO = [
  {
    id: "cliente-demo",
    nombre: "Cliente Demo",
    rut: "11.111.111-1",
    correo: "cliente@losmaestros.cl",
    telefono: "+56 9 5555 1111",
    clave: "cliente123",
    rol: "Cliente",
    tipoCliente: "Contratista / Maestro de obra",
    cuentaCorriente: true,
  },
  {
    id: "empleado-demo",
    nombre: "Empleado Demo",
    rut: "12.345.678-5",
    correo: "empleado@losmaestros.cl",
    telefono: "+56 9 5555 2222",
    clave: "empleado123",
    rol: "Empleado",
    tipoCliente: "Interno",
    cuentaCorriente: false,
  },
  {
    id: "admin-demo",
    nombre: "Administrador Demo",
    rut: "9.876.543-3",
    correo: "admin@losmaestros.cl",
    telefono: "+56 9 5555 3333",
    clave: "admin123",
    rol: "Administrador",
    tipoCliente: "Interno",
    cuentaCorriente: false,
  },
];

export const CLAVE_USUARIOS = "ferreteriaUsuariosReact";
export const CLAVE_SESION = "ferreteriaSesionReact";

export function obtenerUsuariosRegistrados() {
  try {
    const texto = localStorage.getItem(CLAVE_USUARIOS);
    const datos = texto ? JSON.parse(texto) : [];
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

export function guardarUsuariosRegistrados(usuarios) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

export function buscarUsuarioPorCorreo(correo) {
  const correoNormalizado = correo.trim().toLowerCase();
  const usuarios = [...USUARIOS_DEMO, ...obtenerUsuariosRegistrados()];
  return usuarios.find((usuario) => usuario.correo.toLowerCase() === correoNormalizado) ?? null;
}
