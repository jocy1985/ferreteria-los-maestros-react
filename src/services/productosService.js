import { productos as productosIniciales } from "../data/productos";

export const CLAVE_PRODUCTOS = "ferreteriaProductosReact";

function copiarProductos(datos) {
  return datos.map((producto) => ({ ...producto }));
}

function guardar(datos) {
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(datos));
}

export function obtenerProductos() {
  try {
    const texto = localStorage.getItem(CLAVE_PRODUCTOS);
    if (!texto) {
      const iniciales = copiarProductos(productosIniciales);
      guardar(iniciales);
      return iniciales;
    }

    const datos = JSON.parse(texto);
    return Array.isArray(datos) ? datos : copiarProductos(productosIniciales);
  } catch {
    return copiarProductos(productosIniciales);
  }
}

export function crearProducto(datos) {
  const actuales = obtenerProductos();
  const codigo = datos.codigo.trim().toUpperCase();

  if (actuales.some((producto) => producto.codigo === codigo)) {
    return { ok: false, mensaje: "Ya existe un producto con ese código." };
  }

  const nuevo = {
    ...datos,
    id: Date.now(),
    codigo,
    nombre: datos.nombre.trim(),
    categoria: datos.categoria.trim(),
    marca: datos.marca.trim(),
    unidad: datos.unidad.trim(),
    precio: Number(datos.precio),
    stock: Number(datos.stock),
    stockMinimo: Number(datos.stockMinimo),
    precioOferta: datos.precioOferta ? Number(datos.precioOferta) : undefined,
    descripcion: datos.descripcion?.trim() || "Producto disponible en Ferretería Los Maestros.",
    imagen: datos.imagen?.trim() || "/assets/img/productos/martillo-carpintero.jpg",
  };

  const actualizados = [...actuales, nuevo];
  guardar(actualizados);
  return { ok: true, producto: nuevo, productos: actualizados };
}

export function actualizarProducto(codigo, cambios) {
  const actuales = obtenerProductos();
  const indice = actuales.findIndex((producto) => producto.codigo === codigo);

  if (indice === -1) return { ok: false, mensaje: "Producto no encontrado." };

  const actualizado = {
    ...actuales[indice],
    ...cambios,
    codigo,
    precio: Number(cambios.precio ?? actuales[indice].precio),
    stock: Number(cambios.stock ?? actuales[indice].stock),
    stockMinimo: Number(cambios.stockMinimo ?? actuales[indice].stockMinimo),
  };

  if (cambios.precioOferta === "" || cambios.precioOferta === null) {
    delete actualizado.precioOferta;
  } else if (cambios.precioOferta !== undefined) {
    actualizado.precioOferta = Number(cambios.precioOferta);
  }

  const actualizados = [...actuales];
  actualizados[indice] = actualizado;
  guardar(actualizados);
  return { ok: true, producto: actualizado, productos: actualizados };
}

export function eliminarProducto(codigo) {
  const actuales = obtenerProductos();
  const actualizados = actuales.filter((producto) => producto.codigo !== codigo);

  if (actualizados.length === actuales.length) {
    return { ok: false, mensaje: "Producto no encontrado." };
  }

  guardar(actualizados);
  return { ok: true, productos: actualizados };
}

export function restablecerProductos() {
  const iniciales = copiarProductos(productosIniciales);
  guardar(iniciales);
  return iniciales;
}
