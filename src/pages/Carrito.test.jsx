import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Carrito from "./Carrito";

const { mockCambiar, mockEliminar, mockVaciar, productos } = vi.hoisted(() => ({
  mockCambiar: vi.fn(),
  mockEliminar: vi.fn(),
  mockVaciar: vi.fn(),
  productos: {
    PT001: { codigo: "PT001", nombre: "Pintura látex", unidad: "galón", precio: 9990, precioOferta: 8990, imagen: "/pintura.jpg" },
    HM001: { codigo: "HM001", nombre: "Martillo", unidad: "unidad", precio: 7990, imagen: "/martillo.jpg" },
  },
}));

vi.mock("../context/CarritoContext", () => ({
  useCarrito: () => ({
    carrito: [{ codigo: "PT001", cantidad: 2 }, { codigo: "HM001", cantidad: 1 }],
    mensaje: "",
    cambiarCantidad: mockCambiar,
    eliminarProducto: mockEliminar,
    vaciarCarrito: mockVaciar,
  }),
}));

vi.mock("../context/ProductosContext", () => ({
  useProductos: () => ({ buscarProducto: (codigo) => productos[codigo] ?? null }),
}));

describe("Integrante 3 - Página Carrito", () => {
  beforeEach(() => {
    mockCambiar.mockReset();
    mockEliminar.mockReset();
    mockVaciar.mockReset();
  });

  it("23. calcula subtotales y total con ofertas y conecta los controles de cantidad, eliminación y checkout", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Carrito />
      </MemoryRouter>
    );

    expect(screen.getByText("Subtotal: $17.980")).toBeInTheDocument();
    expect(screen.getByText("Subtotal: $7.990")).toBeInTheDocument();
    expect(screen.getByText("$25.970")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continuar al checkout/i })).toHaveAttribute("href", "/checkout");

    await user.click(screen.getByLabelText(/sumar una unidad de pintura látex/i));
    expect(mockCambiar).toHaveBeenCalledWith("PT001", 3);

    await user.click(screen.getAllByRole("button", { name: /eliminar/i })[0]);
    expect(mockEliminar).toHaveBeenCalledWith("PT001");

    await user.click(screen.getByRole("button", { name: /vaciar pedido/i }));
    expect(mockVaciar).toHaveBeenCalledTimes(1);
  });
});
