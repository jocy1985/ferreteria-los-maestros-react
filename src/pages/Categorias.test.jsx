import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Categorias from "./Categorias";

const { productosPrueba, categoriasPrueba } = vi.hoisted(() => ({
  categoriasPrueba: ["Herramientas", "Pinturas"],
  productosPrueba: [
    { codigo: "HM001", categoria: "Herramientas" },
    { codigo: "HM010", categoria: "Herramientas" },
    { codigo: "PT001", categoria: "Pinturas" },
  ],
}));

vi.mock("../context/ProductosContext", () => ({
  useProductos: () => ({ productos: productosPrueba, categorias: categoriasPrueba }),
}));

describe("Integrante 1 - Categorías", () => {
  it("6. calcula la cantidad por categoría y construye enlaces que abren el catálogo filtrado", () => {
    render(
      <MemoryRouter>
        <Categorias />
      </MemoryRouter>
    );

    expect(screen.getByText("2 productos disponibles.")).toBeInTheDocument();
    expect(screen.getByText("1 producto disponible.")).toBeInTheDocument();
    const enlaces = screen.getAllByRole("link", { name: /ver productos/i });
    expect(enlaces[0]).toHaveAttribute("href", "/catalogo?categoria=Herramientas");
    expect(enlaces[1]).toHaveAttribute("href", "/catalogo?categoria=Pinturas");
  });
});
