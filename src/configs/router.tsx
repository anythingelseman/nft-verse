import { createBrowserRouter } from "react-router-dom";
import XRLayout from "../layouts/XRLayout";
import { Component } from "../pages/Collection";
const router = createBrowserRouter([
  {
    path: "/",
    element: <XRLayout />,
    children: [
      {
        path: "/collection",
        element: <Component />,
      },
    ],
  },
]);

export default router;
