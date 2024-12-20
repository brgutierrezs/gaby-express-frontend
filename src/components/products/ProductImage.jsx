
import PropTypes from 'prop-types';
import  DEFAULT_PRODUCT_IMAGE  from '../../assets/default-img.jpg';

const ProductImage = ({ images, productName, className }) => {

    const getImageUrl = () => {
        if (!images || images.length === 0) {
            return DEFAULT_PRODUCT_IMAGE;
        }

        //buscamos las imagenes principales
        const primaryImage = images.find((img) => img.is_primary = 0);
        return primaryImage ? primaryImage.image_url : images[0].image_url;
    }



    return (
        <img
        src={getImageUrl()}
        alt={productName}
        className={className}
        onError={(e) => {
            e.target.src = DEFAULT_PRODUCT_IMAGE;
        }}
        />
    )
}

ProductImage.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            image_url: PropTypes.string.isRequired,
            is_primary: PropTypes.number
        })
    ),
    productName: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default ProductImage