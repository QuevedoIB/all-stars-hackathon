import { createBrowserRouter } from "react-router-dom";
import Container from "@/components/common/Container";
import FeedList from "@/components/lists/FeedList";
import NotFoundPage from "@/components/common/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Container />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/feed",
        element: <FeedList />,
      },
    ],
  },
]);

export default router;
