import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Ofertas from "./Ofertas";

const { mockAgregar, productosPrueba } = vi.hoisted(() => ({
  mockAgregar: vi.fn(),
  productosPrueba: [
    { codigo: "PT001", nombre: "Pintura en oferta", categoria: "Pinturas", marca: "Sipa", unidad: "galón", precio: 9990, precioOferta: 8990, stock: 10, stockMinimo: 2, imagen: "/pintura.jpg" },
    { codigo: "HM001", nombre: "Martillo normal", categoria: "Herramientas", marca: "Stanley", unidad: "unidad", precio: 7990, stock: 10, stockMinimo: 2, imagen: "/martillo.jpg" },
  ],
}));

vi.mock("../context/ProductosContext", () => ({
  useProductos: () => ({ productos: productosPrueba }),
}));

vi.mock("../context/CarritoContext", () => ({
  useCarrito: () => ({ agregarProducto: mockAgregar }),
}));

describe("Integrante 1 - Ofertas", () => {
  it("7. excluye productos normales y muestra únicamente los que tienen precio promocional", () => {
    render(
      <MemoryRouter>
        <Ofertas />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Pintura en oferta" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Martillo normal" })).not.toBeInTheDocument();
    expect(screen.getByText("Oferta")).toBeInTheDocument();
  });
});
