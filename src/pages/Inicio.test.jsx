import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Inicio from "./Inicio";

const { productosPrueba, categoriasPrueba } = vi.hoisted(() => ({
  categoriasPrueba: ["Construcción", "Herramientas"],
  productosPrueba: [
    { codigo: "MC001", nombre: "Cemento", categoria: "Construcción", descripcion: "Material para construcción", imagen: "/cemento.jpg" },
    { codigo: "X2", nombre: "Producto 2", categoria: "Herramientas", descripcion: "Dos", imagen: "/2.jpg" },
    { codigo: "HM001", nombre: "Martillo", categoria: "Herramientas", descripcion: "Herramienta manual", imagen: "/martillo.jpg" },
    { codigo: "X4", nombre: "Producto 4", categoria: "Construcción", descripcion: "Cuatro", imagen: "/4.jpg" },
    { codigo: "HE001", nombre: "Taladro", categoria: "Herramientas", descripcion: "Herramienta eléctrica", imagen: "/taladro.jpg" },
  ],
}));

vi.mock("../context/ProductosContext", () => ({
  useProductos: () => ({ productos: productosPrueba, categorias: categoriasPrueba }),
}));

describe("Integrante 1 - Inicio", () => {
  it("10. conecta la portada con categorías filtradas y detalles de los productos destacados", () => {
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>
    );

    const enlacesCategoria = screen.getAllByRole("button", { name: /ver en catálogo/i });
    expect(enlacesCategoria[0]).toHaveAttribute("href", "/catalogo?categoria=Construcci%C3%B3n");
    expect(enlacesCategoria[1]).toHaveAttribute("href", "/catalogo?categoria=Herramientas");

    const enlacesDetalle = screen.getAllByRole("button", { name: /ver detalle/i });
    expect(enlacesDetalle).toHaveLength(3);
    expect(enlacesDetalle[0]).toHaveAttribute("href", "/producto/MC001");
    expect(enlacesDetalle[1]).toHaveAttribute("href", "/producto/HE001");
    expect(enlacesDetalle[2]).toHaveAttribute("href", "/producto/HM001");
  });
});
