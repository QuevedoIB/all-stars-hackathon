import { createHashRouter } from "react-router-dom";
import Container from "@/components/common/Container";
import NotFoundPage from "@/components/common/NotFoundPage";
import AchievementsPage from "@/pages/AchievementsPage";
import FeedsPage from "@/pages/FeedsPage";
import HomePage from "@/pages/HomePage";

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/all-stars",
    element: <Container />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/all-stars/feed",
        element: <FeedsPage />,
      },
      {
        path: "/all-stars/achievements",
        element: <AchievementsPage />,
      },
    ],
  },
]);

export default router;
