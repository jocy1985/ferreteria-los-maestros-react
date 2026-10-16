import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CarritoProvider, CLAVE_CARRITO, useCarrito } from "./CarritoContext";
import { ProductosProvider } from "./ProductosContext";

function ComponentePruebaCarrito() {
  const { carrito, agregarProducto, mensaje, cantidadTotal } = useCarrito();

  return (
    <div>
      <button type="button" onClick={() => agregarProducto("HE001", 3)}>Agregar sobre stock</button>
      <button type="button" onClick={() => agregarProducto("MC001", 2)}>Agregar compra válida</button>
      <p role="status">{mensaje}</p>
      <span data-testid="cantidad-total">{cantidadTotal}</span>
      <span data-testid="items-carrito">{JSON.stringify(carrito)}</span>
    </div>
  );
}

function renderizarCarrito() {
  return render(
    <ProductosProvider>
      <CarritoProvider>
        <ComponentePruebaCarrito />
      </CarritoProvider>
    </ProductosProvider>
  );
}

describe("Integrante 3 - CarritoContext", () => {
  it("21. protege el inventario rechazando cantidades superiores al stock disponible", async () => {
    const user = userEvent.setup();
    renderizarCarrito();

    await user.click(screen.getByRole("button", { name: /agregar sobre stock/i }));

    expect(screen.getByRole("status")).toHaveTextContent("No hay más stock disponible de Taladro percutor 650 W.");
    expect(screen.getByTestId("cantidad-total")).toHaveTextContent("0");
  });

  it("22. agrega una compra válida y persiste el carrito para conservarlo entre páginas", async () => {
    const user = userEvent.setup();
    renderizarCarrito();

    await user.click(screen.getByRole("button", { name: /agregar compra válida/i }));

    expect(screen.getByTestId("cantidad-total")).toHaveTextContent("2");
    expect(screen.getByTestId("items-carrito")).toHaveTextContent('"codigo":"MC001"');
    await waitFor(() => expect(localStorage.getItem(CLAVE_CARRITO)).toContain('"cantidad":2'));
  });
});
