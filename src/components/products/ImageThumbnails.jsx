import PropTypes from 'prop-types';

const ImageThumbnails = ({ images, selectedImage, onSelectImage, productName }) => {
  return (
    <div className="flex gap-2 overflow-x-auto py-2">
    {images.map((img) => (
      <div
        key={img.id}
        className={`flex-shrink-0 cursor-pointer transition-all duration-200 ${
          selectedImage === img.id ? "ring-2 ring-red-500" : "hover:opacity-75"
        }`}
        onClick={() => onSelectImage(img.id)}
      >
        <img
          src={img.image_url}
          alt={`${productName}`}
          className="w-24 h-24 object-cover rounded-md"
        />
      </div>
    ))}
  </div>
  )
}

ImageThumbnails.propTypes = {
    images: PropTypes.string,
    selectedImage: PropTypes.func,
    onSelectImage: PropTypes.func,
    productName : PropTypes.string
}

export default ImageThumbnails