import { useState } from "react";
import { Link } from "react-router-dom"
import HamburgerMenu from "../components/menu/HamburgerMenu";
import LoginModal from "../pages/public/LoginUser/LoginModal";


const Header = () => {

    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const toggleLoginModal = () => {
        setIsLoginOpen((prev) => !prev);
    }
    return (
        <>
            <header className="bg-red-600 text-white sticky  ">

                <div className="container mx-auto px-4 py-2 flex justify-between items-center">

                    {/* Logo */}
                    <div className="text-2xl font-bold ">
                        <Link to='/'>GabyExpress</Link>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden lg:flex flex-grow mx-4">
                        <input
                            type="text"
                            placeholder="Buscar Productos"
                            className=" flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none max-w-6xl"
                        />
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-r-md">
                            Buscar
                        </button>
                    </div>

                    {/* User Options */}
                    <div className=" hidden lg:flex space-x-4  items-center ">
                        <Link className="hover:text-gray-200 " onClick={toggleLoginModal}>{isLoginOpen ? "Cerrar Sesion" : "Iniciar Sesion"}</Link>
                        <Link to='/cart' className="hover:text-gray-200">🛒 Cart</Link>
                    </div>

                    {/* User Options  Mobile*/}
                    <div className="lg:hidden  ">
                        {/* Mobile Menu Icon */}

                        <HamburgerMenu />
                    </div>

                </div>

                {/* Navigation Bar */}
                <nav className="bg-red-700 hidden   md:flex ">
                    <div className="container mx-auto px-4 py-2 flex space-x-4">
                        <Link className="hover:text-gray-300">Categorias</Link>
                        <Link className="hover:text-gray-300">Ofertas</Link>
                        <Link className="hover:text-gray-300">Otros</Link>
                        <Link className="hover:text-gray-300">Mas</Link>
                    </div>
                </nav>

                {/* Modal Login */}
                <LoginModal toggleLoginModal={toggleLoginModal} isLoginOpen={isLoginOpen} />


                {/* Mobile Search Bar */}
                <div className="bg-white p-2 flex lg:hidden ">
                    <input
                        type="text"
                        placeholder="Buscar Productos"
                        className="flex-grow px-4 py-2 rounded-l-md  border border-gray-300  focus:outline-none"
                    />
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md">
                        Buscar
                    </button>
                </div>

            </header>
        </>
    )
}

export default Header