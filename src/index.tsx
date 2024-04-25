import "./style.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AppContextProvider from "@/core/AppContext";

import router from "@/router";

const App = () => {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </AppContextProvider>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
