import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DetalleProducto from "./DetalleProducto";

const { mockBuscar, mockAgregar } = vi.hoisted(() => ({
  mockBuscar: vi.fn(),
  mockAgregar: vi.fn(),
}));

vi.mock("../context/ProductosContext", () => ({
  useProductos: () => ({ buscarProducto: mockBuscar }),
}));

vi.mock("../context/CarritoContext", () => ({
  useCarrito: () => ({ agregarProducto: mockAgregar, mensaje: "" }),
}));

const productoDetalle = {
  codigo: "HM001",
  nombre: "Martillo carpintero 500 g",
  categoria: "Herramientas",
  marca: "Stanley",
  unidad: "unidad",
  precio: 7990,
  stock: 20,
  stockMinimo: 5,
  descripcion: "Martillo para trabajos de carpintería.",
  imagen: "/martillo.jpg",
};

function renderizar(ruta = "/producto/HM001") {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/producto/:codigo" element={<DetalleProducto />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Integrante 1 - Detalle de producto", () => {
  beforeEach(() => {
    mockBuscar.mockReset();
    mockAgregar.mockReset();
  });

  it("8. informa correctamente cuando el código solicitado no existe", () => {
    mockBuscar.mockReturnValue(null);
    renderizar("/producto/NOEXISTE");

    expect(mockBuscar).toHaveBeenCalledWith("NOEXISTE");
    expect(screen.getByRole("heading", { name: /producto no encontrado/i })).toBeInTheDocument();
  });

  it("9. permite elegir una cantidad y agrega esa cantidad exacta al carrito", async () => {
    const user = userEvent.setup();
    mockBuscar.mockReturnValue(productoDetalle);
    renderizar();

    const cantidad = screen.getByLabelText(/cantidad/i);
    fireEvent.change(cantidad, { target: { value: "3" } });
    await user.click(screen.getByRole("button", { name: /agregar al pedido/i }));

    expect(screen.getByText(/stock disponible:/i).parentElement).toHaveTextContent("20");
    expect(mockAgregar).toHaveBeenCalledWith("HM001", 3);
  });
});
