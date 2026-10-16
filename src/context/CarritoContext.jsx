import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useProductos } from "./ProductosContext";

export const CLAVE_CARRITO = "ferreteriaCarritoReact";

function leerCarrito() {
  try {
    const texto = localStorage.getItem(CLAVE_CARRITO);
    const datos = texto ? JSON.parse(texto) : [];
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
  const { buscarProducto } = useProductos();
  const [carrito, setCarrito] = useState(leerCarrito);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

  function agregarProducto(codigo, cantidad = 1) {
    const producto = buscarProducto(codigo);
    if (!producto) return { ok: false, mensaje: "Producto no encontrado." };

    const cantidadSolicitada = Math.max(1, Number(cantidad) || 1);
    const existente = carrito.find((item) => item.codigo === codigo);
    const nuevaCantidad = (existente?.cantidad ?? 0) + cantidadSolicitada;

    if (nuevaCantidad > producto.stock) {
      const texto = `No hay más stock disponible de ${producto.nombre}.`;
      setMensaje(texto);
      return { ok: false, mensaje: texto };
    }

    setCarrito((actual) => {
      const yaExiste = actual.some((item) => item.codigo === codigo);
      return yaExiste
        ? actual.map((item) => item.codigo === codigo ? { ...item, cantidad: item.cantidad + cantidadSolicitada } : item)
        : [...actual, { codigo, cantidad: cantidadSolicitada }];
    });

    setMensaje(`${producto.nombre} fue agregado a Mi pedido.`);
    return { ok: true };
  }

  function cambiarCantidad(codigo, nuevaCantidad) {
    const producto = buscarProducto(codigo);
    if (!producto) return { ok: false, mensaje: "Producto no encontrado." };

    const cantidad = Number(nuevaCantidad);
    if (cantidad < 1) {
      const texto = "La cantidad mínima es 1. Usa Eliminar si deseas quitar el producto.";
      setMensaje(texto);
      return { ok: false, mensaje: texto };
    }

    if (cantidad > producto.stock) {
      const texto = `No hay más stock disponible de ${producto.nombre}.`;
      setMensaje(texto);
      return { ok: false, mensaje: texto };
    }

    setCarrito((actual) => actual.map((item) => item.codigo === codigo ? { ...item, cantidad } : item));
    setMensaje("Cantidad actualizada.");
    return { ok: true };
  }

  function eliminarProducto(codigo) {
    setCarrito((actual) => actual.filter((item) => item.codigo !== codigo));
    setMensaje("Producto eliminado del pedido.");
  }

  function vaciarCarrito() {
    setCarrito([]);
    setMensaje("Tu pedido fue vaciado.");
  }

  const cantidadTotal = carrito.reduce((total, item) => total + Number(item.cantidad || 0), 0);

  const valor = useMemo(
    () => ({ carrito, mensaje, cantidadTotal, agregarProducto, cambiarCantidad, eliminarProducto, vaciarCarrito }),
    [carrito, mensaje, cantidadTotal]
  );

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (!contexto) throw new Error("useCarrito debe utilizarse dentro de CarritoProvider");
  return contexto;
}
