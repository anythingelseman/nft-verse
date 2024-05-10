import { createBrowserRouter } from "react-router-dom";
import XRLayout from "../layouts/XRLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <XRLayout />,
    children: [
      {
        path: "/collection",
        lazy: () => import("../pages/Collection"),
      },
    ],
  },
]);

export default router;
