import { createRoot } from "react-dom/client";
import App from "./App";
import "@/popup/styles/globals.css"; // Tailwind & global styles

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
