import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import useAxios from '../../../hooks/useAxios';
import globalUrl from '../../../config/globalUrl';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CategoriesSubmenu = ({ toggleMenu }) => {

    const [categories, setCategories] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const { fetchData } = useAxios();

    //useEffect para traer la lista de categorias que estan en base de datos
    useEffect(() => {

        const fetchCategories = async () => {

            try {
                const response = await fetchData(globalUrl + "/product/all-category");
                setCategories(response.categories);

            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        }
        fetchCategories();
    }, []);



    return (
        <>
            <li>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center justify-between w-full py-2 px-4 hover:bg-gray-100 rounded-md text-black"
                >
                    <span>Categorias</span>
                    {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="pl-6 space-y-2">
                        {categories.map((category) => (
                            <li key={category.id} className='border-t border-gray-300'>
                                <Link
                                    to={`/categoria/${category.id}-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="block py-2 px-4 hover:bg-gray-100 rounded-md text-black text-sm"
                                    onClick={toggleMenu}
                                >
                                    <span className="mr-2">{category.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>
            </li>
        </>
    )
}
CategoriesSubmenu.propTypes = {
    toggleMenu: PropTypes.func.isRequired,
};

export default CategoriesSubmenu;
