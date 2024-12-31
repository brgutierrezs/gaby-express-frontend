import PropTypes from 'prop-types'
import ProductImage from './ProductImage'
import { Link } from 'react-router-dom'
const ProductCard = ({ product, onPreview, handleAddToCart }) => {

    return (

        <div className="border border-gray-200 rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition duration-300  ">
            {/* Imagen del Producto */}
            <Link to={'/product/'+product.id}>
            <ProductImage
                images={product.ProductImages}
                productName={product.name}
                className="w-full h-48 object-contain mb-4"
                productId = {product.id}

            />
            </Link>
            {/* Título */}
            <h3 title={product.name} className=' text-xl font-semibold mb-2 truncate '>{product.name}</h3>

            {/* Precio */}
            <p className="text-xl font-bold text-rose-600 mb-4">${product.price}</p>
            {/* Botones */}
            <div className="flex gap-2 justify-center">
                <button
                    onClick={() => onPreview(product)}
                    className="flex-1  bg-orange-500 hover:bg-orange-600 text-white py-2 px-2  rounded transition duration-300 "
                >
                    Previsualizar
                </button>
                <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2  px-4 rounded transition duration-300 "
                >
                    Agregar al carrito
                </button>
            </div>
        </div>

    )
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    onPreview: PropTypes.func.isRequired,
    handleAddToCart: PropTypes.func.isRequired
}

export default ProductCard