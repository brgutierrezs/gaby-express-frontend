import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import globalUrl from "../../../config/globalUrl";
import { useParams } from "react-router-dom";
import DEFAULT_PRODUCT_IMAGE from '../../../assets/default-img.jpg';

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const { data, loading, error, fetchData } = useAxios();
    const [selectedImage, setSelectedImage] = useState(0); // Controlar la imagen seleccionada por ID
    const [imgSelect, setImgSelect] = useState(""); // Estado inicial vacío
    const [isZoomed, setIsZoomed] = useState(false); // Controlar el zoom

    const { id } = useParams();

    // Fetch del producto
    useEffect(() => {
        const fetchProduct = async () => {
            await fetchData(globalUrl + "/product/all-product?id=" + id, "GET");
        };
        fetchProduct();
    }, [id]);

    // Actualizar producto y establecer imagen inicial
    useEffect(() => {
        if (data?.products) {
            const [productData] = data.products; // Obtenemos el producto
            setProduct(productData);
            //seteamos la primera imagen que es la principal
            setSelectedImage(productData.ProductImages[0].id);
          
        }
    }, [data]);

    // Actualizar la imagen principal al cambiar la imagen seleccionada
    useEffect(() => {
        if (product && product.ProductImages) {
            //buscamos la imagen comparando id ya que selectedImage contiene el id de la imagen selecionada
            const selectedImgObj = product.ProductImages.find(img => img.id === selectedImage);
            //seteamos la imagen seleccionada para mostrarla como principal
            setImgSelect(selectedImgObj.image_url);
        }
    }, [product, selectedImage]);

    // Función para manejar el zoom
    const handleImageZoom = () => {
        setIsZoomed(!isZoomed);
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">Error: {error}</div>;
    if (!product) return <div className="text-center">No se encontró el producto</div>;
   
    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border">
                <div className="flex flex-col space-y-4">
                    <div className="relative overflow-hidden rounded-lg bg-gray-100 h-[500px]">
                        <img
                            src={imgSelect || DEFAULT_PRODUCT_IMAGE}
                            onError={(e) => {
                                e.target.src = DEFAULT_PRODUCT_IMAGE;
                            }}
                            alt={product?.name || "Imagen no disponible"}
                            className={`w-full h-full object-contain transition-transform duration-300 cursor-zoom-in ${
                                isZoomed ? "scale-150" : "scale-100"
                            }`}
                            onClick={handleImageZoom}
                            style={{ transformOrigin: isZoomed ? "50% 50%" : "center" }}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto py-2">
                        {product.ProductImages.map((img) => (
                            <div
                                key={img.id}
                                className={`flex-shrink-0 cursor-pointer transition-all duration-200 ${
                                    selectedImage === img.id ? "ring-2 ring-red-500" : "hover:opacity-75"
                                }`}
                                onClick={() => setSelectedImage(img.id)}
                            >
                                <img
                                    src={img.image_url}
                                    alt={`${product.name}`}
                                    className="w-24 h-24 object-cover rounded-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-3xl font-bold text-red-600">${product.price}</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Descripción del Producto</h3>
                        <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <button className="w-full py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
                            Agregar al carrito
                        </button>
                        <button className="w-full py-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">
                            Comprar ahora
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
