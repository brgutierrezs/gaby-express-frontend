import { useState } from "react";
import { Link } from "react-router-dom"
import HamburgerMenu from "../../components/menu/HamburgerMenu";
import LoginModal from "../../pages/public/LoginUser/LoginModal";
import { useAuth } from "../../hooks/authContext";
import UserOption from "../../components/menu/UserOption";
import NavigationBar from "../../components/common/navBarMenu/NavigationBar ";

const AdminHeader = () => {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { auth } = useAuth();

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
                        <UserOption auth={auth} toggleLoginModal={toggleLoginModal} />
                    </div>

                    {/* User Options  Mobile*/}
                    <div className="lg:hidden  ">
                        {/* Mobile Menu Icon */}

                        <HamburgerMenu auth={auth} />
                    </div>

                </div>

                {/* Navigation Bar */}
                <NavigationBar />

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

export default AdminHeader