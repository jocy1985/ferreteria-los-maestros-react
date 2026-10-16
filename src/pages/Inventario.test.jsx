import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProductosProvider } from "../context/ProductosContext";
import Inventario from "./Inventario";

describe("Integrante 3 - Inventario", () => {
  it("24. identifica stock bajo y permite filtrar el inventario", async () => {
    const user = userEvent.setup();

    render(
      <ProductosProvider>
        <Inventario />
      </ProductosProvider>
    );

    expect(screen.getAllByText("Stock bajo")).toHaveLength(2);

    await user.type(screen.getByLabelText(/buscar por código, producto o categoría/i), "HE001");

    expect(screen.getByRole("status")).toHaveTextContent("Mostrando 1 producto(s).");
    expect(screen.getByText("Taladro percutor 650 W")).toBeInTheDocument();
    expect(screen.queryByText("Casco de seguridad blanco")).not.toBeInTheDocument();
  });
});
