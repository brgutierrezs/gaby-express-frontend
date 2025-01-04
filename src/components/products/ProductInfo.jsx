import PropTypes from "prop-types"
import ProductActions from "./ProductActions "

const ProductInfo = ({ name, price, description }) => {

    return (
        <div className="flex flex-col space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold text-red-600">${price}</span>
                </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción del Producto</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
            <ProductActions />
        </div>
    )
}
ProductInfo.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    description : PropTypes.string
}

export default ProductInfo