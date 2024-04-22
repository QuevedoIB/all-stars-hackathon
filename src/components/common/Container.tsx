import { Outlet } from "react-router-dom";
import NavBar from "@/components/common/NavBar";

const Container = () => {
  return (
    <main className="min-h-screen h-full mx-auto flex flex-col bg-gameSwipe-neutral">
      <NavBar />
      <Outlet />
    </main>
  );
};

export default Container;
