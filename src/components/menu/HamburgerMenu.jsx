import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    // Cerrar el menú al presionar la tecla Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <div className="relative">
            {/* Botón del menú hamburguesa */}
            <div className="flex space-x-4">
                <Link to="/cart" className="hover:text-gray-200">🛒 Cart</Link>
                <button
                    onClick={toggleMenu}
                    className="z-50 relative"
                    aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Menú deslizante */}
            <div
                className={`
                    fixed top-0 left-0 w-64 h-full bg-white shadow-lg 
                    transform transition-transform duration-500 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    z-40 p-6
                `}
            >
                <nav className="mt-3 border  border-gray-100 shadow-md rounded-md h-full ">
                    <ul className="space-y-6">
                        <li>
                            <Link
                                to="/"
                                className="block py-2 px-4 hover:bg-gray-100 rounded-md text-black"
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/productos"
                                className="block py-2 px-4 hover:bg-gray-100 rounded-md text-black"
                            >
                                Productos
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/categorias"
                                className="block py-2 px-4 hover:bg-gray-100 rounded-md text-black"
                            >
                                Categorías
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/carrito"
                                className="block py-2 px-4 hover:bg-gray-100 rounded-md text-black"
                            >
                                Carrito
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/perfil"
                                className="block py-2 px-4 hover:bg-gray-100 rounded-md text-black"
                            >
                                Perfil
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Overlay semi-transparente */}
            {isOpen && (
                <div
                    onClick={toggleMenu}
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    aria-hidden="true"
                ></div>
            )}
        </div>
    );
};

export default HamburgerMenu;
