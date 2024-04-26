import { Outlet } from "react-router-dom";
import NavBar from "@/components/common/NavBar";
import Background from "@/components/common/Background/Background";

const Container = () => {
  return (
    <main className="min-h-screen h-full mx-auto flex flex-col bg-gameSwipe-neutral">
      <NavBar />
      <section className="flex w-full h-full">
        <Outlet />
      </section>
      <Background />
    </main>
  );
};

export default Container;
