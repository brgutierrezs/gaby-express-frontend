
import { useState } from 'react';
import DEFAULT_PRODUCT_IMAGE from '../../assets/default-img.jpg'
import PropTypes from 'prop-types';
import ImageThumbnails from './ImageThumbnails';

const ProductImages = ({ images, productName }) => {


    const [selectedImage, setSelectedImage] = useState(images[0]?.id);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isZoomed, setIsZoomed] = useState(false);

    const selectedImageUrl = images.find(img => img.id === selectedImage)?.image_url || DEFAULT_PRODUCT_IMAGE;

    const handleMouseMove = (e) => {
        if (!isZoomed) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setPosition({ x, y });
    };

    return (
        <div className="flex flex-col space-y-4">
            <div
                className="relative overflow-hidden rounded-lg bg-gray-100 h-[500px]"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
            >
                <img
                    src={selectedImageUrl}
                    onError={(e) => { e.target.src = DEFAULT_PRODUCT_IMAGE }}
                    alt={productName || "Imagen no disponible"}
                    className="w-full h-full object-contain transition-transform duration-75"
                    style={{
                        transform: isZoomed ? 'scale(2)' : 'scale(1)',
                        transformOrigin: `${position.x}% ${position.y}%`
                    }}
                />
            </div>
            <ImageThumbnails
                images={images}
                selectedImage={selectedImage}
                onSelectImage={setSelectedImage}
                productName={productName}
            />
        </div>
    )
}

ProductImages.propTypes = {
    images: PropTypes.string,
    productName: PropTypes.string
}

export default ProductImages