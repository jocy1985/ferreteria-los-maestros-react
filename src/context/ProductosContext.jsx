import { createContext, useContext, useMemo, useState } from "react";
import {
  actualizarProducto as actualizarProductoServicio,
  crearProducto as crearProductoServicio,
  eliminarProducto as eliminarProductoServicio,
  obtenerProductos,
  restablecerProductos as restablecerProductosServicio,
} from "../services/productosService";

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(obtenerProductos);

  function crearProducto(datos) {
    const resultado = crearProductoServicio(datos);
    if (resultado.ok) setProductos(resultado.productos);
    return resultado;
  }

  function actualizarProducto(codigo, cambios) {
    const resultado = actualizarProductoServicio(codigo, cambios);
    if (resultado.ok) setProductos(resultado.productos);
    return resultado;
  }

  function eliminarProducto(codigo) {
    const resultado = eliminarProductoServicio(codigo);
    if (resultado.ok) setProductos(resultado.productos);
    return resultado;
  }

  function restablecerProductos() {
    setProductos(restablecerProductosServicio());
  }

  function buscarProducto(codigo) {
    return productos.find((producto) => producto.codigo === codigo) ?? null;
  }

  const categorias = useMemo(
    () => [...new Set(productos.map((producto) => producto.categoria))].sort((a, b) => a.localeCompare(b, "es")),
    [productos]
  );

  const valor = useMemo(
    () => ({ productos, categorias, buscarProducto, crearProducto, actualizarProducto, eliminarProducto, restablecerProductos }),
    [productos, categorias]
  );

  return <ProductosContext.Provider value={valor}>{children}</ProductosContext.Provider>;
}

export function useProductos() {
  const contexto = useContext(ProductosContext);
  if (!contexto) throw new Error("useProductos debe utilizarse dentro de ProductosProvider");
  return contexto;
}
