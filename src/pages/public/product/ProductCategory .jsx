import { useEffect } from "react";
import { useParams } from "react-router-dom"
import useAxios from "../../../hooks/useAxios";
import globalUrl from "../../../config/globalUrl"
import { useState } from "react";
import Loading from "../../../components/common/Loading";
import ProductCard from "../../../components/products/ProductCard";
const ProductCategory = () => {


    const { id } = useParams(); //capturamos el parametro del url
    const cateogryId = id.split('-')[0]//hacemos un split para capturar el numero antes del guion
    const { fetchData, loading } = useAxios();

    //declaracion de estados
    const [products, setProducts] = useState([]);


    //hacemos uso del useEfect para traer los productos filtrados una sola vez
    useEffect(() => {

        const fetchProducts = async () => {

            try {
                const response = await fetchData(globalUrl + "/product/all-product?categoryId=" + cateogryId)
                setProducts(response.products);
                console.log(response)
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }

        }
        fetchProducts()
    }, [id])

    const handlePreview = (product) => {
        alert(`Previsualizando: ${product.title}`);
    };

    const handleAddToCart = (product) => {
        alert(`Producto agregado al carrito: ${product.title}`);
    };

    if (loading) return <Loading />;
    console.log("productos", products)

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

        </div>
    )
}

export default ProductCategory 