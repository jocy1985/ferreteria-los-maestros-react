import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PanelAdmin from "./PanelAdmin";

const {
  productosAdmin,
  mockCrear,
  mockActualizar,
  mockEliminar,
  mockRestablecer,
} = vi.hoisted(() => ({
  productosAdmin: [
    { codigo: "MC001", nombre: "Cemento gris 25 kg", categoria: "Construcción", marca: "Polpaico", unidad: "saco", precio: 5990, stock: 80, stockMinimo: 20, descripcion: "Cemento", imagen: "/cemento.jpg" },
    { codigo: "HE001", nombre: "Taladro percutor 650 W", categoria: "Herramientas eléctricas", marca: "Makita", unidad: "unidad", precio: 79990, stock: 2, stockMinimo: 3, descripcion: "Taladro", imagen: "/taladro.jpg" },
  ],
  mockCrear: vi.fn(),
  mockActualizar: vi.fn(),
  mockEliminar: vi.fn(),
  mockRestablecer: vi.fn(),
}));

vi.mock("../context/SesionContext", () => ({
  useSesion: () => ({ usuario: { nombre: "Administrador Prueba", rol: "Administrador" } }),
}));

vi.mock("../context/ProductosContext", () => ({
  useProductos: () => ({
    productos: productosAdmin,
    crearProducto: mockCrear,
    actualizarProducto: mockActualizar,
    eliminarProducto: mockEliminar,
    restablecerProductos: mockRestablecer,
  }),
}));

function renderizarAdmin() {
  return render(
    <MemoryRouter>
      <PanelAdmin />
    </MemoryRouter>
  );
}

async function completarNuevoProducto(user) {
  await user.type(document.querySelector('input[name="codigo"]'), "ZZ001");
  await user.type(document.querySelector('input[name="nombre"]'), "Producto nuevo");
  await user.type(document.querySelector('input[name="categoria"]'), "Herramientas");
  await user.type(document.querySelector('input[name="marca"]'), "Marca Test");
  await user.type(document.querySelector('input[name="precio"]'), "12990");
  await user.type(document.querySelector('input[name="stock"]'), "10");
  await user.type(document.querySelector('input[name="stockMinimo"]'), "2");
}

describe("Integrante 3 - PanelAdmin", () => {
  beforeEach(() => {
    mockCrear.mockReset();
    mockActualizar.mockReset();
    mockEliminar.mockReset();
    mockRestablecer.mockReset();
  });

  it("27. valida el formulario y crea un producto solo cuando los datos son correctos", async () => {
    const user = userEvent.setup();
    mockCrear.mockReturnValue({ ok: true });
    renderizarAdmin();

    await user.click(screen.getByRole("button", { name: /nuevo producto/i }));
    await user.click(screen.getByRole("button", { name: /^guardar$/i }));
    expect(screen.getByText(/completa los campos obligatorios/i)).toBeInTheDocument();
    expect(mockCrear).not.toHaveBeenCalled();

    await completarNuevoProducto(user);
    await user.click(screen.getByRole("button", { name: /^guardar$/i }));

    expect(mockCrear).toHaveBeenCalledWith(expect.objectContaining({ codigo: "ZZ001", nombre: "Producto nuevo", precio: "12990", stock: "10" }));
    expect(screen.getByText("Producto creado correctamente.")).toBeInTheDocument();
  });

  it("28. carga un producto existente en el modal y envía sus cambios al actualizar", async () => {
    const user = userEvent.setup();
    mockActualizar.mockReturnValue({ ok: true });
    renderizarAdmin();

    await user.click(screen.getAllByRole("button", { name: /^editar$/i })[0]);
    const precio = document.querySelector('input[name="precio"]');
    expect(document.querySelector('input[name="codigo"]')).toBeDisabled();
    expect(precio).toHaveValue(5990);

    await user.clear(precio);
    await user.type(precio, "6490");
    await user.click(screen.getByRole("button", { name: /^guardar$/i }));

    expect(mockActualizar).toHaveBeenCalledWith("MC001", expect.objectContaining({ codigo: "MC001", precio: "6490" }));
    expect(screen.getByText("Producto actualizado correctamente.")).toBeInTheDocument();
  });

  it("29. solicita confirmación antes de eliminar y elimina únicamente cuando el usuario acepta", async () => {
    const user = userEvent.setup();
    mockEliminar.mockReturnValue({ ok: true });
    const confirmar = vi.spyOn(window, "confirm").mockReturnValueOnce(false).mockReturnValueOnce(true);
    renderizarAdmin();

    const botonesEliminar = screen.getAllByRole("button", { name: /^eliminar$/i });
    await user.click(botonesEliminar[0]);
    expect(mockEliminar).not.toHaveBeenCalled();

    await user.click(botonesEliminar[0]);
    expect(confirmar).toHaveBeenCalledWith("¿Eliminar Cemento gris 25 kg?");
    expect(mockEliminar).toHaveBeenCalledWith("MC001");
    expect(screen.getByText("Producto eliminado correctamente.")).toBeInTheDocument();
  });
});
