import { useEffect, useState } from "react"
import ProductCard from "../../../components/products/ProductCard";
import useAxios from "../../../hooks/useAxios";
import globalUrl from "../../../config/globalUrl";
import { Outlet } from "react-router-dom";

const Product = () => {

    const [products, setProducts] = useState([]);
    const {data, loading, error, fetchData } = useAxios();

    useEffect(() => {
    
        const fetchProducts = async () => {
            await fetchData(globalUrl + "/product/all-product", 'GET');
            
        };

        fetchProducts();
    }, []); 

    useEffect(() => {
        if (data?.products) {
            setProducts(data.products);
            console.log(products)
            console.log('datos',data);
        }
    }, [data]);

    // Renderizado condicional basado en el estado
    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error: {error}</p>;
    // Funciones para botones
    const handlePreview = (product) => {
        alert(`Previsualizando: ${product.title}`);
    };

    const handleAddToCart = (product) => {
        alert(`Producto agregado al carrito: ${product.title}`);
    };
    
    

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 box-border ">
            {products.map((product) => (

                <ProductCard
                    key={product.id}
                    product={product}
                    onPreview={handlePreview}
                    handleAddToCart={handleAddToCart}
                />
            ))}
         <Outlet />
        </div>
    )
}

export default Product