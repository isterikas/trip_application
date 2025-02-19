import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import Error from "./components/Error.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<Error />}></ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
