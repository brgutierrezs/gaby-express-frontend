import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/public/Home"
import About from "../pages/public/About";
import NotFound from "../pages/public/NotFound";
import PublicRoute from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import DashBoard from "../pages/private/DashBoard";
import { Register } from "../pages/public/user/Register";
import Product from "../pages/public/product/Product";
import ProductDetail from "../pages/public/product/ProductDetail";
import CreateProduct from "../pages/private/product/CreateProduct";
import AdminRoutes from "./AdminRoutes";
import IndexLayout from "../layouts/IndexLayout";
import LogOut from "../pages/private/user/LogOut";
import Login from "../pages/public/LoginUser/Login";



export const AppRoutes = createBrowserRouter([
    // Rutas Públicas
    {
        path: '/',
        element: <PublicRoute><IndexLayout /></PublicRoute>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '*',
                element: <NotFound />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/products",
                element: <Product />
            },
            {
                path: "product/:id",
                element: <ProductDetail />
            },
            {
                path: '/login',
                element: <Login />
            }
        ]
    },

    // Rutas privadas
    {
        path: '/dashboard',
        element: <PrivateRoutes><IndexLayout /></PrivateRoutes>,
        children: [
            {
                index: true,
                element: <DashBoard />
            },
            // {
            //     path: 'profile',
            //     element: <ProfilePage />
            // },
            // {
            //     path: 'orders',
            //     element: <OrdersPage />
            // },
            // Otras páginas del dashboard...
            {
                path: 'cerrar-session',
                element: <LogOut />
            }
        ]
    },

    // Rutas de administrador
    {
        path: '/admin',
        element: <AdminRoutes><IndexLayout /></AdminRoutes>,
        children: [
            {
                index: true,
                element: <CreateProduct />
            },
            // Otras rutas de administración...
        ]
    }
]);

