import { describe, expect, it, vi } from "vitest";
import {
  CLAVE_PRODUCTOS,
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerProductos,
} from "./productosService";

describe("Integrante 3 - Persistencia de productos", () => {
  it("30. mantiene un CRUD persistente y rechaza códigos duplicados para proteger la integridad del catálogo", () => {
    const spySetItem = vi.spyOn(Storage.prototype, "setItem");

    const duplicado = crearProducto({
      codigo: "MC001",
      nombre: "Cemento duplicado",
      categoria: "Construcción",
      marca: "Otra marca",
      unidad: "saco",
      precio: 5000,
      precioOferta: "",
      stock: 10,
      stockMinimo: 2,
      descripcion: "Duplicado",
      imagen: "",
    });
    expect(duplicado).toEqual({ ok: false, mensaje: "Ya existe un producto con ese código." });

    const creado = crearProducto({
      codigo: "ZZ001",
      nombre: "Producto persistente",
      categoria: "Pruebas",
      marca: "Marca Test",
      unidad: "unidad",
      precio: 1000,
      precioOferta: "",
      stock: 5,
      stockMinimo: 2,
      descripcion: "Producto usado por la prueba.",
      imagen: "",
    });
    expect(creado.ok).toBe(true);

    const actualizado = actualizarProducto("ZZ001", { precio: 1500, stock: 8, stockMinimo: 3, precioOferta: "" });
    expect(actualizado.ok).toBe(true);
    expect(obtenerProductos().find((p) => p.codigo === "ZZ001")).toEqual(expect.objectContaining({ precio: 1500, stock: 8 }));

    const eliminado = eliminarProducto("ZZ001");
    expect(eliminado.ok).toBe(true);
    expect(obtenerProductos().some((p) => p.codigo === "ZZ001")).toBe(false);
    expect(spySetItem).toHaveBeenCalledWith(CLAVE_PRODUCTOS, expect.any(String));
  });
});
