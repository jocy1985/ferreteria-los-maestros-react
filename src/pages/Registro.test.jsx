import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Registro from "./Registro";

const { mockRegistrarUsuario } = vi.hoisted(() => ({
  mockRegistrarUsuario: vi.fn(),
}));

vi.mock("../context/SesionContext", () => ({
  useSesion: () => ({ registrarUsuario: mockRegistrarUsuario }),
}));

function renderizarRegistro() {
  return render(
    <MemoryRouter initialEntries={["/registro"]}>
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<h1>LOGIN DESTINO</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

async function completarFormularioValido(user, correo = "nuevo@correo.cl") {
  await user.type(screen.getByLabelText(/nombre completo/i), "Juan Pérez");
  await user.type(screen.getByLabelText(/^rut$/i), "12.345.678-5");
  await user.type(screen.getByLabelText(/^correo$/i), correo);
  await user.type(screen.getByLabelText(/celular/i), "9 1234 5678");
  await user.selectOptions(screen.getByLabelText(/tipo de cliente/i), "Particular");
  await user.type(screen.getByLabelText(/^contraseña$/i), "clave123");
  await user.type(screen.getByLabelText(/repetir contraseña/i), "clave123");
}

describe("Integrante 2 - Registro", () => {
  beforeEach(() => {
    mockRegistrarUsuario.mockReset();
  });

  it("11. informa errores personalizados cuando se intenta registrar un formulario inválido", async () => {
    const user = userEvent.setup();
    renderizarRegistro();

    await user.type(screen.getByLabelText(/nombre completo/i), "Jo");
    await user.type(screen.getByLabelText(/^correo$/i), "correo-invalido");
    await user.click(screen.getByRole("button", { name: /crear cuenta/i }));

    expect(screen.getByText("Ingresa un nombre de al menos 3 caracteres.")).toBeInTheDocument();
    expect(screen.getByText("Ingresa un RUT chileno válido.")).toBeInTheDocument();
    expect(screen.getByText(/ingresa un correo válido/i)).toBeInTheDocument();
    expect(mockRegistrarUsuario).not.toHaveBeenCalled();
  });

  it("12. envía un formulario válido al registro y navega al login", async () => {
    const user = userEvent.setup();
    mockRegistrarUsuario.mockReturnValue({ ok: true });
    renderizarRegistro();

    await completarFormularioValido(user);
    await user.click(screen.getByRole("button", { name: /crear cuenta/i }));

    expect(mockRegistrarUsuario).toHaveBeenCalledTimes(1);
    expect(mockRegistrarUsuario).toHaveBeenCalledWith(expect.objectContaining({ correo: "nuevo@correo.cl", tipoCliente: "Particular" }));
    expect(screen.getByRole("heading", { name: "LOGIN DESTINO" })).toBeInTheDocument();
  });

  it("13. muestra el mensaje del contexto cuando el correo ya se encuentra registrado", async () => {
    const user = userEvent.setup();
    mockRegistrarUsuario.mockReturnValue({ ok: false, mensaje: "Ya existe una cuenta asociada a ese correo." });
    renderizarRegistro();

    await completarFormularioValido(user, "cliente@losmaestros.cl");
    await user.click(screen.getByRole("button", { name: /crear cuenta/i }));

    expect(screen.getByText("Ya existe una cuenta asociada a ese correo.")).toBeInTheDocument();
  });
});
