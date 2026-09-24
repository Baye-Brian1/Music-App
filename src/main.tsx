import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MusicProvider } from "./context/MusicContext.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MusicProvider>
        <App />
      </MusicProvider>
    </BrowserRouter>
  </StrictMode>,
);
