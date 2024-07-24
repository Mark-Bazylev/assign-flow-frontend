import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AuthLayout } from "../layouts/AuthLayout";
import { TasksPage } from "../pages/TasksPage";
import { LoginPage } from "../pages/LoginPage";
import MainLayout from "../layouts/MainLayout";
import {ProjectsPage} from "../pages/ProjectsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path:"projects",
            element: <ProjectsPage/>
          },
          {
            path: "tasks/:id",
            element: <TasksPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);
