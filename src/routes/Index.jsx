import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/public/Home"
import About from "../pages/public/About";
import NotFound from "../pages/public/NotFound";
import PublicRoute from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import DashBoard from "../pages/private/DashBoard";
import PublicLayout from "../layouts/PublicLayout";

const isAuthenticated = true
export const AppRoutes = createBrowserRouter(

    [
        //Rutas Publicas
        {
            path: '/',
            element: <PublicLayout />,
            children: [
                {
                    index: true,
                    element: <PublicRoute> <Home /></PublicRoute>
                },

                {
                    path: '/about',
                    element: <PublicRoute><About /></PublicRoute>
                },

                {
                    path: '*',
                    element: <PublicRoute><NotFound /></PublicRoute>
                },
            ]
        },

        //Rutas privadas
        {
            path: '/dashBoard',
            children: [
                {
                    index:true,
                    element: <PrivateRoutes isAuthenticated={isAuthenticated}> <DashBoard /> </PrivateRoutes>
                }
            ]
        }

    ]
);

