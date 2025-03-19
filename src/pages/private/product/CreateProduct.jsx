import { useEffect, useState } from "react";
import { debounceTime, Subject } from "rxjs";
import globalUrl from '../../../config/globalUrl';
import useAxios from '../../../hooks/useAxios';
const addProductSend = new Subject();
const addProductSend$ = addProductSend.asObservable();

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    images: [],
  });
  const { fetchData } = useAxios();

  const [categories, setCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAddImage = () => {
    if (formData.images.length >= 5) {
      alert("No puedes agregar más de 5 imágenes.");
      return;
    }

    if (imageUrl.trim() !== "") {
      const newImage = { image_url: imageUrl, is_primary: isPrimary };

      // Si se marca como primaria, desmarcar las demás
      const updatedImages = isPrimary
        ? formData.images.map(img => ({ ...img, is_primary: false }))
        : formData.images;

      setFormData({
        ...formData,
        images: [...updatedImages, newImage],
      });

      setImageUrl("");
      setIsPrimary(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addProductSend.next(formData);
  };

  // Obtener categorías desde la API usando useEffect
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchData(globalUrl + '/product/all-category');
        setCategories(response.categories);
      } catch (error) {
        setMessage(`Error al obtener las categorias: ${error.message}`);
      }
    }
    getCategories();
  }, []);

  // Crear El Producto utilizando pipe y debounceTime para controlar la cantidad de peticiones
  useEffect(() => {
    const subscription = addProductSend$.pipe(debounceTime(1000)).subscribe(async (form) => {
      try {
        const response = await fetchData(globalUrl + '/product/create-product', 'POST', {}, form);
        setMessage(response.message);
      } catch (error) {
        setMessage(`Error a la creacion del producto: ${error.message}`);
      }
    });
    return () => {
      return subscription.unsubscribe();
    }
  }, []);

  return (
    <div className="flex justify-center p-2 md:p-6">
      <div className="bg-white rounded-sm shadow-sm p-4 md:p-6 w-full max-w-2xl">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-black">Crear Producto</h2>
        
        {message && (
          <p className={`mb-4 p-3 rounded ${message.includes("Error") ? "text-red-500" : "text-green-600"}`}>
            {message}
          </p>
        )}
        
        {/* Contenedor flexible que cambia a columna en móvil */}
        <div className="flex flex-col md:flex-row md:gap-6">
          {/* Formulario - ocupa todo el ancho en móvil y mitad en desktop */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                  placeholder="Nombre"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm resize-none"
                  placeholder="Descripción"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
                <input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                  placeholder="Precio"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                  placeholder="Cantidad en stock"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Selecciona una categoría</label>
                <select
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                >
                  <option value="">Seleccionar categoría</option>
                  {categories?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input para agregar imágenes - mejor adaptado para móvil */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Imágenes</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
                  placeholder="URL de la imagen"
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="isPrimary"
                    checked={isPrimary}
                    onChange={() => setIsPrimary(!isPrimary)}
                    className="mr-2"
                  />
                  <label htmlFor="isPrimary" className="text-sm text-gray-700">Imagen principal</label>
                </div>
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="mt-2 w-full md:w-auto px-3 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
                >
                  Agregar Imagen
                </button>
              </div>

              <button
                type="submit"
                className="w-full px-3 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
              >
                Crear Producto
              </button>
            </form>
          </div>

          {/* Galería de imágenes - visible en todos los dispositivos */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Imágenes agregadas:</h3>
            {formData.images.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay imágenes agregadas</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img.image_url}
                      alt={`Imagen ${index + 1}`}
                      className={`w-full h-24 object-cover rounded-md border cursor-pointer ${
                        img.is_primary ? "border-4 border-green-500" : "border-gray-300"
                      }`}
                      onClick={() => {
                        setSelectedImage(img.image_url);
                        setShowModal(true);
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(index);
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs"
                    >
                      ✕
                    </button>
                    {img.is_primary && (
                      <span className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded">
                        Principal
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Modal para vista ampliada */}
        {showModal && selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2" 
            onClick={() => setShowModal(false)}
          >
            <div className="relative max-w-4xl max-h-screen p-2 md:p-4">
              <button 
                className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-black font-bold z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(false);
                }}
              >
                ✕
              </button>
              <img 
                src={selectedImage} 
                alt="Vista ampliada" 
                className="max-w-full max-h-[90vh] object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;