import "./style.css";

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppContextProvider from "@/core/AppContext";

import router from "@/router";

const App = () => {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
