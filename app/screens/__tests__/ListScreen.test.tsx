import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import ListScreen from "../ListScreen";

// Mock global fetch
global.fetch = jest.fn();

describe("ListScreen", () => {
  it("muestra mensaje de lista vacía si no hay elementos", async () => {
    // Mockear fetch para devolver array vacío
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const { getByText } = render(<ListScreen />);

    await waitFor(() => expect(getByText("No hay elementos")).toBeTruthy());
  });

  it("muestra error si fetch falla", async () => {
    // Mockear fetch para que falle
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Error en la petición")
    );

    const { getByText } = render(<ListScreen />);

    await waitFor(() =>
      expect(getByText("Ocurrió un error: Error en la petición")).toBeTruthy()
    );
  });

  it("muestra datos si fetch devuelve elementos", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: "1", name: "Pauline Blanda", avatar: "" }],
    });

    const { getByText } = render(<ListScreen />);

    await waitFor(() => expect(getByText("Pauline Blanda")).toBeTruthy());
  });
});
