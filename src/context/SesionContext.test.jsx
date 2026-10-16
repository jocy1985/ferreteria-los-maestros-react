import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CLAVE_SESION } from "../data/usuarios";
import { SesionProvider, useSesion } from "./SesionContext";

function ComponentePruebaSesion() {
  const { usuario, iniciarSesion } = useSesion();

  return (
    <div>
      <button type="button" onClick={() => iniciarSesion("cliente@losmaestros.cl", "cliente123", true)}>
        Iniciar recordando
      </button>
      <button type="button" onClick={() => iniciarSesion("cliente@losmaestros.cl", "cliente123", false)}>
        Iniciar temporal
      </button>
      <span data-testid="rol-usuario">{usuario?.rol ?? "Sin sesión"}</span>
    </div>
  );
}

describe("Integrante 2 - SesionContext", () => {
  it("16. persiste la sesión en el almacenamiento correcto según la opción Recuérdame", async () => {
    const user = userEvent.setup();
    render(
      <SesionProvider>
        <ComponentePruebaSesion />
      </SesionProvider>
    );

    await user.click(screen.getByRole("button", { name: /iniciar recordando/i }));
    expect(localStorage.getItem(CLAVE_SESION)).toContain("cliente@losmaestros.cl");
    expect(sessionStorage.getItem(CLAVE_SESION)).toBeNull();

    await user.click(screen.getByRole("button", { name: /iniciar temporal/i }));
    expect(localStorage.getItem(CLAVE_SESION)).toBeNull();
    expect(sessionStorage.getItem(CLAVE_SESION)).toContain("cliente@losmaestros.cl");
    expect(screen.getByTestId("rol-usuario")).toHaveTextContent("Cliente");
  });
});
