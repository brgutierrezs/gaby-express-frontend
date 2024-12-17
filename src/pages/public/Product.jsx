import { useEffect, useState } from "react"
import ProductCard from "../../components/products/ProductCard";


const Product = () => {

    const [products, setProducts] = useState([]);


    useEffect(() => {

        const fetchProducts = async () => {

            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setProducts(data)
                console.log(data)
            } catch (error) {
                console.log(error);
            }


        }

        fetchProducts();

    }, [])

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

        </div>
    )
}

export default Product