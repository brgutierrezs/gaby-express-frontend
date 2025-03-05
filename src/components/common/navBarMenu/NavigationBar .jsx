import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import CategoriesList from "./CategoriesList";
import useAxios from "../../../hooks/useAxios";
import globalUrl from '../../../config/globalUrl';

const NavigationBar = ({ className }) => {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const { fetchData } = useAxios();
    const menuRef = useRef(null); // Referencia para el contenedor del menú

    const toggleCategories = () => {
        setIsCategoriesOpen((prev) => !prev);
    };

    // Efecto para cerrar el menú si se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsCategoriesOpen(false);
            }
        };

        if (isCategoriesOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCategoriesOpen]);

    // Obtener categorías desde la API
    useEffect(() => {
        const constFetchCategories = async () => {
            try {
                const response = await fetchData(globalUrl + "/product/all-category");
                setCategories(response.categories);
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        };
        constFetchCategories();
    }, []);

    return (
        <nav className={`bg-red-700 md:flex ${className}`}>
            <div className="container mx-auto px-4 py-2 flex space-x-4">
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={toggleCategories}
                        className="hover:text-gray-200 focus:outline-none">
                        Categorias
                    </button>

                    {isCategoriesOpen && (
                        <div className="absolute top-full left-0 bg-white rounded-lg shadow-lg w-56 mt-2 p-2 z-50 transition-opacity duration-200">
                            <CategoriesList categories={categories} toggleCategories={toggleCategories}/>
                        </div>
                    )}
                </div>
                <Link className="hover:text-gray-300">Ofertas</Link>
                <Link className="hover:text-gray-300">Otros</Link>
                <Link className="hover:text-gray-300">Mas</Link>

            </div>
        </nav>
    );
};

// Definir PropTypes (opcional, pero recomendado)
NavigationBar.propTypes = {
    className: PropTypes.string
};

export default NavigationBar;
