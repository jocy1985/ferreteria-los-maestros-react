import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/estilos.css";
import App from "./App";
import { SesionProvider } from "./context/SesionContext";
import { ProductosProvider } from "./context/ProductosContext";
import { CarritoProvider } from "./context/CarritoContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SesionProvider>
        <ProductosProvider>
          <CarritoProvider>
            <App />
          </CarritoProvider>
        </ProductosProvider>
      </SesionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
