

import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const CategoriesList = ({ categories, toggleCategories }) => {




  return (
    <>
      <ul className="py-2">
        {categories.map((item) => (
          <li key={item.id}>
            <Link onClick={toggleCategories} to={`/categoria/${item.id}-${item.name.toLowerCase().replace(/\s+/g, '-')}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md" >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      
    })
).isRequired,
  toggleCategories: PropTypes.func.isRequired,
};

export default CategoriesList;
