import { createHashRouter } from "react-router-dom";
import Container from "@/components/common/Container";
import NotFoundPage from "@/components/common/NotFoundPage";
import AchievementsPage from "@/pages/AchievementsPage";
import FeedsPage from "@/pages/FeedsPage";

const router = createHashRouter([
  {
    path: "/",
    element: <Container />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/feed",
        element: <FeedsPage />,
      },
      {
        path: "/achievements",
        element: <AchievementsPage />,
      },
    ],
  },
]);

export default router;
