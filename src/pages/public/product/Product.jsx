import { useEffect, useState } from "react"
import ProductCard from "../../../components/products/ProductCard";
import CircularPagination from "../../../components/common/CircularPagination";
import useAxios from "../../../hooks/useAxios";
import globalUrl from "../../../config/globalUrl";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../components/common/Loading";
import { Subject, debounceTime } from "rxjs";

const searchProduct = new Subject();
const searchProduct$ = searchProduct.asObservable();

const Product = () => {


    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');
    const { loading, error, fetchData } = useAxios();
    const [search, setSearch] = useState({
        search: '',
        categoryId: '',
        categories: [],
        order: '',
        sort: '',
        page: 1,
        totalPages: 1
    });


    const handledSeach = (e) => {
        const { name, value } = e.target;
        setSearch(prev => {
            const updatedSearch = { ...prev, [name]: value, page: 1 }; // Actualizamos el valor de la propiedad};
            searchProduct.next(updatedSearch); // Ahora emitimos el valor actualizado
            return updatedSearch;
        });

        

    }

    // Manejar cambio de página
    const handlePageChange = (newPage) => {
        setSearch((prev) => ({
            ...prev,
            page: newPage
        }));

        searchProduct.next({ ...search, page: newPage });
    };


    useEffect(() => {

        const subscription = searchProduct$.pipe(debounceTime(200)).subscribe(async (search) => {



            const fetchProducts = async () => {

                try {


                    // Construir los query parameters basados en el objeto search
                    const queryParams = new URLSearchParams();

                    // Solo agregar parámetros que tengan valor
                    if (search.search) queryParams.append('search', search.search);
                    if (search.categoryId) queryParams.append('categoryId', search.categoryId);
                    if (search.order) queryParams.append('order', search.order);
                    if (search.sort) queryParams.append('sort', search.sort);
                    queryParams.append('page', search.page.toString());

                    // Construir la URL con los query parameters
                    console.log(queryParams.toString())
                    console.log(search.search)
                    const url = `${globalUrl}/product/all-product?${queryParams.toString()}`;

                    const response = await fetchData(url, 'GET');
                    if (response?.products) {
                        setProducts(response.products);
                        setSearch(prev => {
                            return {
                                ...prev,
                                page: response.currentPage,
                                totalPages: response.totalPages
                            }
                        })

                    }
                } catch (error) {
                    setMessage('Error al cargar los productos' + error.message);
                }
            };

            fetchProducts();


        })

        return () => {
            subscription.unsubscribe();
        }


    }, []);


    useEffect(() => {

        const fetchCategorias = async () => {

            try {
                const response = await fetchData(globalUrl + "/product/all-category", 'GET');
                if (response?.categories) {
                    setSearch({
                        ...search,
                        categories: response.categories
                    });
                }
            } catch (error) {
                setMessage('Error al cargar las categorias' + error.message);
            }
        }
        fetchCategorias();

    }, []);


    // ✅ Cargar productos al inicio sin esperar el Subject
    useEffect(() => {
        searchProduct.next(search);
    }, []);


    const handlePreview = (product) => {
        alert(`Previsualizando: ${product.title}`);
    };

    const handleAddToCart = (product) => {
        alert(`Producto agregado al carrito: ${product.title}`);
    };


    // Renderizado condicional basado en el estado
    if (loading) return <Loading />;
    if (error) return <p>Error: {error + message} </p>;
    // Funciones para botones
    console.log(search)

    return (
        <div className="flex flex-col items-center justify-center  ">
            <div className="flex xl:flex-row-reverse  flex-col-reverse xl:justify-between xl:items-start xl:gap-4 justify-center items-center ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 p-6 box-border ">

                    {products.map((product) => (

                        <ProductCard
                            key={product.id}
                            product={product}
                            onPreview={handlePreview}
                            handleAddToCart={handleAddToCart}
                        />
                    ))}

                </div>
                {/* {barra buscadora de filtros xl } */}
                <div className=" hidden xl:flex rounded-sm flex-col m-[22px] shadow-sm border bg-white gap-4 p-6 w-full max-w-md">
                    <div className="w-full flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="text-gray-500"

                        />
                        <input
                            placeholder="Buscar productos..."
                            className="w-full px-2 outline-none"
                            name="search"
                            value={search.search}
                            onChange={handledSeach}
                        />
                    </div>
                    <select
                        className="w-full  px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={search.categoryId}
                        name="categoryId"
                        onChange={handledSeach}
                    >
                        <option value="" >Todas las categorías</option>
                        Todas las categorias
                        {search.categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}

                    </select>

                </div>
                {/* {barra buscadora de filtros sm } */}
                <div className=" xl:hidden sm:flex flex-col rounded-sm  m-[22px] shadow-sm border bg-white gap-4 p-6 w-full max-w-full ">
                    <div className="w-full flex items-center border rounded-lg px-2 py-2 mb-4 focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
                        <label htmlFor="search" className="sr-only">Buscar productos</label>
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="flex-shrink-0 text-gray-500 mx-1"
                        />
                        <input
                            placeholder="Buscar productos..."
                            className="w-full outline-none text-gray-500 px-1 truncate"
                            name="search"
                            id="search"
                            value={search.search}
                            onChange={handledSeach}
                        />
                    </div>
                    <select
                        className="w-full  px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        name="categoryId"
                        value={search.categoryId}
                        onChange={handledSeach}
                    >
                        <option value="" >Todas las categorías</option>
                        Todas las categorias
                        {search.categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}

                    </select>
                </div>

            </div>

            <CircularPagination totalPages={search.totalPages} currentPage={search.page} onPageChange ={handlePageChange} />


        </div>
    )
}

export default Product