import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Catalogo from "./Catalogo";

const { mockAgregar, productosPrueba, categoriasPrueba } = vi.hoisted(() => ({
  mockAgregar: vi.fn(),
  categoriasPrueba: ["Construcción", "Herramientas eléctricas"],
  productosPrueba: [
    {
      codigo: "MC001",
      nombre: "Cemento gris 25 kg",
      categoria: "Construcción",
      marca: "Polpaico",
      unidad: "saco",
      precio: 5990,
      stock: 80,
      stockMinimo: 20,
      imagen: "/cemento.jpg",
    },
    {
      codigo: "HE001",
      nombre: "Taladro percutor 650 W",
      categoria: "Herramientas eléctricas",
      marca: "Makita",
      unidad: "unidad",
      precio: 79990,
      stock: 2,
      stockMinimo: 3,
      imagen: "/taladro.jpg",
    },
  ],
}));

vi.mock("../context/ProductosContext", () => ({
  useProductos: () => ({ productos: productosPrueba, categorias: categoriasPrueba }),
}));

vi.mock("../context/CarritoContext", () => ({
  useCarrito: () => ({ mensaje: "", agregarProducto: mockAgregar }),
}));

function renderizarCatalogo(ruta = "/catalogo") {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <Catalogo />
    </MemoryRouter>
  );
}

describe("Integrante 1 - Catálogo", () => {
  it("3. busca por nombre o código y actualiza los resultados visibles", async () => {
    const user = userEvent.setup();
    renderizarCatalogo();

    await user.type(screen.getByLabelText(/nombre, marca o código/i), "HE001");

    expect(screen.getByText("Mostrando 1 producto(s).")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Taladro percutor 650 W" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Cemento gris 25 kg" })).not.toBeInTheDocument();
  });

  it("4. filtra por la categoría elegida por el usuario", async () => {
    const user = userEvent.setup();
    renderizarCatalogo();

    await user.selectOptions(screen.getByLabelText(/^categoría$/i), "Construcción");

    expect(screen.getByText("Mostrando 1 producto(s).")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Cemento gris 25 kg" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Taladro percutor 650 W" })).not.toBeInTheDocument();
  });

  it("5. respeta la categoría recibida desde la URL al entrar desde Inicio o Categorías", () => {
    renderizarCatalogo("/catalogo?categoria=Herramientas%20el%C3%A9ctricas");

    expect(screen.getByLabelText(/^categoría$/i)).toHaveValue("Herramientas eléctricas");
    expect(screen.getByText("Mostrando 1 producto(s).")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Taladro percutor 650 W" })).toBeInTheDocument();
  });
});
