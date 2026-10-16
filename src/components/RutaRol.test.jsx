import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import RutaRol from "./RutaRol";

const { estadoSesion } = vi.hoisted(() => ({
  estadoSesion: { usuario: { rol: "Cliente" } },
}));

vi.mock("../context/SesionContext", () => ({
  useSesion: () => ({ usuario: estadoSesion.usuario }),
}));

describe("Integrante 3 - Protección por roles", () => {
  it("25. impide que un cliente acceda a administración y lo devuelve a su panel", () => {
    estadoSesion.usuario = { rol: "Cliente" };

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route
            path="/admin"
            element={
              <RutaRol roles={["Administrador"]}>
                <h1>ADMINISTRACIÓN PRIVADA</h1>
              </RutaRol>
            }
          />
          <Route path="/mi-cuenta" element={<h1>CUENTA CLIENTE</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: "CUENTA CLIENTE" })).toBeInTheDocument();
    expect(screen.queryByText("ADMINISTRACIÓN PRIVADA")).not.toBeInTheDocument();
  });
});
