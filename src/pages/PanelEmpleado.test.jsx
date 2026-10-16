import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import PanelEmpleado from "./PanelEmpleado";

const { productosPrueba } = vi.hoisted(() => ({
  productosPrueba: [
    { codigo: "HE001", stock: 2, stockMinimo: 3 },
    { codigo: "SE001", stock: 4, stockMinimo: 5 },
    { codigo: "MC001", stock: 80, stockMinimo: 20 },
  ],
}));

vi.mock("../context/SesionContext", () => ({
  useSesion: () => ({ usuario: { nombre: "Empleado Prueba", rol: "Empleado" } }),
}));

vi.mock("../context/ProductosContext", () => ({
  useProductos: () => ({ productos: productosPrueba }),
}));

describe("Integrante 3 - PanelEmpleado", () => {
  it("26. calcula dinámicamente las alertas de inventario y entrega acceso directo al inventario", () => {
    render(
      <MemoryRouter>
        <PanelEmpleado />
      </MemoryRouter>
    );

    expect(screen.getByText(/hola, empleado prueba/i)).toBeInTheDocument();
    const tarjetaStock = screen.getByText("Productos con stock bajo").closest(".card-body");
    expect(within(tarjetaStock).getByText("2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /revisar inventario/i })).toHaveAttribute("href", "/inventario");
    expect(screen.getByText("Constructora Norte")).toBeInTheDocument();
  });
});
