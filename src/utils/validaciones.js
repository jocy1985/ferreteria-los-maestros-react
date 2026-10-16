export function limpiarRut(rut) {
  return rut.replace(/[^0-9kK]/g, "").toUpperCase();
}

export function validarRut(rut) {
  const limpio = limpiarRut(rut);

  if (limpio.length < 8 || limpio.length > 9) {
    return false;
  }

  const cuerpo = limpio.slice(0, -1);
  const dvIngresado = limpio.slice(-1);

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i -= 1) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  let dvCalculado = String(resto);

  if (resto === 11) dvCalculado = "0";
  if (resto === 10) dvCalculado = "K";

  return dvCalculado === dvIngresado;
}

export function normalizarCorreo(correo) {
  return correo.trim().toLowerCase();
}

export function validarCorreo(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizarCorreo(correo));
}

export function normalizarTelefono(telefono) {
  return telefono.replace(/\D/g, "");
}

export function validarTelefono(telefono) {
  const digitos = normalizarTelefono(telefono);
  return /^9\d{8}$/.test(digitos) || /^569\d{8}$/.test(digitos);
}

export function validarRegistro(datos) {
  const errores = {};

  if (!datos.nombre.trim() || datos.nombre.trim().length < 3) {
    errores.nombre = "Ingresa un nombre de al menos 3 caracteres.";
  }

  if (!validarRut(datos.rut)) {
    errores.rut = "Ingresa un RUT chileno válido.";
  }

  if (!validarCorreo(datos.correo)) {
    errores.correo = "Ingresa un correo válido, por ejemplo nombre@correo.cl.";
  }

  if (!validarTelefono(datos.telefono)) {
    errores.telefono = "Ingresa un celular chileno válido, por ejemplo 9 1234 5678.";
  }

  if (!datos.tipoCliente) {
    errores.tipoCliente = "Selecciona si eres particular o contratista/maestro.";
  }

  if (datos.clave.length < 6) {
    errores.clave = "La contraseña debe tener al menos 6 caracteres.";
  }

  if (datos.clave !== datos.repetirClave) {
    errores.repetirClave = "Las contraseñas no coinciden.";
  }

  return errores;
}

export function validarCheckout(datos) {
  const errores = {};

  if (!datos.nombre.trim() || datos.nombre.trim().length < 3) {
    errores.nombre = "Ingresa el nombre de quien recibirá el pedido.";
  }

  if (!validarCorreo(datos.correo)) {
    errores.correo = "Ingresa un correo válido para recibir la confirmación.";
  }

  if (!validarTelefono(datos.telefono)) {
    errores.telefono = "Ingresa un celular válido para coordinar la entrega.";
  }

  if (!datos.entrega) {
    errores.entrega = "Selecciona retiro en tienda o despacho.";
  }

  if (datos.entrega === "despacho") {
    if (!datos.calle.trim()) errores.calle = "Ingresa la calle de entrega.";
    if (!datos.numero.trim()) errores.numero = "Ingresa el número de la dirección.";
    if (!datos.comuna.trim()) errores.comuna = "Ingresa la comuna de entrega.";
  }

  if (!datos.formaPago) {
    errores.formaPago = "Selecciona una forma de pago.";
  }

  return errores;
}
