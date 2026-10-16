import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Checkout from "./Checkout";
import Confirmacion from "./Confirmacion";

const { estadoSesion, estadoCarrito, mockVaciarCarrito, productosCheckout } = vi.hoisted(() => ({
  estadoSesion: { usuario: null },
  estadoCarrito: { carrito: [] },
  mockVaciarCarrito: vi.fn(),
  productosCheckout: [
    {
      codigo: "PT001",
      nombre: "Pintura látex interior 1 galón",
      categoria: "Pinturas",
      marca: "Sipa",
      unidad: "galón",
      precio: 9990,
      precioOferta: 8990,
      stock: 40,
      stockMinimo: 10,
      imagen: "/pintura.jpg",
    },
  ],
}));

vi.mock("../context/SesionContext", () => ({
  useSesion: () => ({ usuario: estadoSesion.usuario }),
}));

vi.mock("../context/ProductosContext", () => ({
  useProductos: () => ({ productos: productosCheckout }),
}));

vi.mock("../context/CarritoContext", () => ({
  useCarrito: () => ({ carrito: estadoCarrito.carrito, vaciarCarrito: mockVaciarCarrito }),
}));

function prepararCliente() {
  estadoSesion.usuario = {
    nombre: "Cliente Maestro",
    correo: "cliente@losmaestros.cl",
    telefono: "9 1234 5678",
    cuentaCorriente: true,
  };
  estadoCarrito.carrito = [{ codigo: "PT001", cantidad: 2 }];
}

function renderizarCheckout() {
  return render(
    <MemoryRouter initialEntries={["/checkout"]}>
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<Confirmacion />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Integrante 2 - Checkout y confirmación", () => {
  beforeEach(() => {
    mockVaciarCarrito.mockReset();
    prepararCliente();
  });

  it("18. autocompleta los datos del cliente y exige dirección cuando selecciona despacho", async () => {
    const user = userEvent.setup();
    renderizarCheckout();

    expect(screen.getByLabelText(/nombre completo/i)).toHaveValue("Cliente Maestro");
    expect(screen.getByLabelText(/^correo$/i)).toHaveValue("cliente@losmaestros.cl");
    expect(screen.getByRole("option", { name: /cuenta corriente/i })).toBeInTheDocument();

    await user.click(screen.getByLabelText(/despacho a domicilio/i));
    await user.click(screen.getByRole("button", { name: /confirmar compra/i }));

    expect(screen.getByText("Ingresa la calle de entrega.")).toBeInTheDocument();
    expect(screen.getByText("Ingresa el número de la dirección.")).toBeInTheDocument();
    expect(mockVaciarCarrito).not.toHaveBeenCalled();
  });

  it("19. calcula el total usando la oferta, guarda el pedido, vacía el carrito y muestra la confirmación", async () => {
    const user = userEvent.setup();
    renderizarCheckout();

    expect(screen.getAllByText("$17.980")).toHaveLength(2);
    await user.click(screen.getByRole("button", { name: /confirmar compra/i }));

    expect(mockVaciarCarrito).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("heading", { name: /tu pedido fue recibido/i })).toBeInTheDocument();
    expect(screen.getByText("Cuenta corriente")).toBeInTheDocument();

    const pedido = JSON.parse(localStorage.getItem("ferreteriaUltimoPedidoReact"));
    expect(pedido).toEqual(expect.objectContaining({ entrega: "retiro", formaPago: "cuenta-corriente", total: 17980 }));
    expect(pedido.items[0]).toEqual(expect.objectContaining({ codigo: "PT001", cantidad: 2, subtotal: 17980 }));
  });
});
