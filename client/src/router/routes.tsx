import App from "@/App";
import Login from "@/pages/login/login";
import Search from "@/pages/search/search";
import { createBrowserRouter, Navigate } from "react-router";
import RequireAuth from "./requireAuth";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Navigate to="/login" replace/>},
            { path: 'login', element: <Login /> },
            {
                element: <RequireAuth />, children: [
                    { path: 'search', element: <Search /> }
                ]
            }
        ]
    },
])