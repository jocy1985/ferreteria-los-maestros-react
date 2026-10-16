import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import PanelCliente from "./PanelCliente";

const { usuarioCliente } = vi.hoisted(() => ({
  usuarioCliente: {
    nombre: "Cliente Maestro",
    correo: "cliente@losmaestros.cl",
    telefono: "9 1111 2222",
    rol: "Cliente",
    tipoCliente: "Contratista / Maestro de obra",
    cuentaCorriente: true,
  },
}));

vi.mock("../context/SesionContext", () => ({
  useSesion: () => ({ usuario: usuarioCliente }),
}));

describe("Integrante 2 - PanelCliente", () => {
  it("17. presenta los datos reales de la sesión y el estado de cuenta corriente del cliente", () => {
    render(
      <MemoryRouter>
        <PanelCliente />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "Hola, Cliente Maestro" })).toBeInTheDocument();
    expect(screen.getByText("Contratista / Maestro de obra")).toBeInTheDocument();
    expect(screen.getByText("Habilitada")).toBeInTheDocument();
    expect(screen.getByText("cliente@losmaestros.cl")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ir al catálogo/i })).toHaveAttribute("href", "/catalogo");
  });
});
