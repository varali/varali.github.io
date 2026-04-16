import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect");
if (redirect) {
  const url = new URL(window.location.href);
  url.searchParams.delete("redirect");
  url.pathname = redirect;
  window.history.replaceState(null, "", url.pathname + (url.search || "") + (url.hash || ""));
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
