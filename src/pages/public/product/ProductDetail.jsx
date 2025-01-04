import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import globalUrl from "../../../config/globalUrl";
import { useParams } from "react-router-dom";

import ProductInfo from "../../../components/products/ProductInfo";
import ProductImages from "../../../components/products/ProductImages";

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const { data, loading, error, fetchData } = useAxios();
   

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
          
        }
    }, [data]);

  
   

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">Error: {error}</div>;
    if (!product) return <div className="text-center">No se encontró el producto</div>;
   
    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border">
          <ProductImages 
            images={product.ProductImages} 
            productName={product.name} 
          />
          <ProductInfo 
            name={product.name}
            price={product.price}
            description={product.description}
          />
        </div>
      </div>
    );
};

export default ProductDetail;
