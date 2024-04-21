import "./style.css";

import { createRoot } from "react-dom/client";

import FeedList from "@/components/lists/FeedList";

const App = () => {
  return (
    <main className="min-h-screen h-full mx-auto bg-gameSwipe-neutral">
      <FeedList />
    </main>
  );
};

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
