import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Confirmacion from "./Confirmacion";

describe("Integrante 2 - Confirmación", () => {
  it("20. controla el acceso al resumen cuando no existe una compra reciente", () => {
    localStorage.removeItem("ferreteriaUltimoPedidoReact");

    render(
      <MemoryRouter>
        <Confirmacion />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /no encontramos una compra reciente/i })).toBeInTheDocument();
    expect(screen.getByText(/realiza una compra para visualizar su resumen/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ir al catálogo/i })).toHaveAttribute("href", "/catalogo");
  });
});
