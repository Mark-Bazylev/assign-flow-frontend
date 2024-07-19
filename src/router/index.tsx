import {createBrowserRouter} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import {AuthLayout} from "../layouts/AuthLayout";
import {HomePage} from "../pages/HomePage";
import {LoginPage} from "../pages/LoginPage";


export const router = createBrowserRouter([
    {
        path:'/',
        element:<ProtectedRoute/>,
        children: [
            {
                path: "home",
                element: <HomePage />,
            },
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children:[
            {
                path: 'login',
                element: <LoginPage/>
            }
        ]
    }
    ]
)