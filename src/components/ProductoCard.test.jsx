import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProductoCard from "./ProductoCard";

const { mockAgregarProducto } = vi.hoisted(() => ({
  mockAgregarProducto: vi.fn(),
}));

vi.mock("../context/CarritoContext", () => ({
  useCarrito: () => ({ agregarProducto: mockAgregarProducto }),
}));

const producto = {
  codigo: "HE001",
  nombre: "Taladro percutor 650 W",
  categoria: "Herramientas eléctricas",
  marca: "Makita",
  unidad: "unidad",
  precio: 79990,
  precioOferta: 69990,
  stock: 2,
  stockMinimo: 3,
  imagen: "/taladro.jpg",
};

function renderizar() {
  return render(
    <MemoryRouter>
      <ProductoCard producto={producto} />
    </MemoryRouter>
  );
}

describe("Integrante 1 - ProductoCard", () => {
  beforeEach(() => mockAgregarProducto.mockReset());

  it("1. representa correctamente oferta, stock bajo y enlace al detalle desde las props", () => {
    const { container } = renderizar();

    expect(screen.getByRole("heading", { name: producto.nombre })).toBeInTheDocument();
    expect(screen.getByText("Oferta")).toBeInTheDocument();
    expect(screen.getByText("Stock bajo")).toBeInTheDocument();
    expect(container.textContent).toContain("79.990");
    expect(container.textContent).toContain("69.990");
    expect(screen.getByRole("button", { name: /ver detalle/i })).toHaveAttribute("href", "/producto/HE001");
  });

  it("2. agrega al carrito el código exacto del producto seleccionado", async () => {
    const user = userEvent.setup();
    renderizar();

    await user.click(screen.getByRole("button", { name: /agregar al pedido/i }));

    expect(mockAgregarProducto).toHaveBeenCalledTimes(1);
    expect(mockAgregarProducto).toHaveBeenCalledWith("HE001");
  });
});
