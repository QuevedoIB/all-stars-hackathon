import "./style.css";

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "@/router";

const App = () => {
  return <RouterProvider router={router} />;
};

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
