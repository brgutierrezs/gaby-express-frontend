import { useEffect, useState, useRef } from "react";
import ProductCard from "../../../components/products/ProductCard";
import useAxios from "../../../hooks/useAxios";
import globalUrl from "../../../config/globalUrl";

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 200000,
    selectedCategory: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const handlePreview = (product) => {
    alert(`Previsualizando: ${product.title}`);
  };

  // Para controlar si debemos llamar a la API
  const [shouldFetch, setShouldFetch] = useState(false);
  const initialLoad = useRef(true);
  const searchTimeout = useRef(null);

  const { data, loading, error, fetchData } = useAxios();

  // Función para construir los parámetros de consulta
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    params.append("page", String(pagination.currentPage));
    if (searchTerm.trim()) params.append("search", searchTerm);
    if (filters.selectedCategory) params.append("categoryId", filters.selectedCategory);
    params.append("minPrice", String(filters.priceMin));
    params.append("maxPrice", String(filters.priceMax));
    params.append("order", "price");
    params.append("sort", "ASC");
    return params.toString();
  };

  // Función segura para buscar productos
  const fetchProducts = async () => {
    try {
      const queryParams = buildQueryParams();
      await fetchData(`${globalUrl}/product/all-product?${queryParams}`, "GET");
    } catch (err) {
      console.error("Error al buscar productos:", err);
    }
  };

  // Cargar categorías una sola vez al inicio
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchData(`${globalUrl}/product/all-category`, "GET");
        if (response?.categories) {
          setCategories(response.categories);
        }
      } catch (err) {
        console.error("Error al obtener categorías:", err);
      }
    };

    // Solo cargar categorías una vez
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Efecto para la carga inicial
  useEffect(() => {
    if (initialLoad.current) {
      fetchProducts();
      initialLoad.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Efecto para manejar cambios que requieren nueva búsqueda
  useEffect(() => {
    if (shouldFetch) {
      fetchProducts();
      setShouldFetch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetch]);

  // Efecto específico para cambios de página
  useEffect(() => {
    if (!initialLoad.current) {
      // Solo ejecutar si no es la carga inicial
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage]);

  // Actualizar productos cuando llegan datos
  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
      setPagination({
        currentPage: parseInt(data.currentPage) || 1,
        totalPages: parseInt(data.totalPages) || 1
      });
    }
  }, [data]);

  // Implementación manual de debounce para la búsqueda
  const debouncedSearch = (func) => {
    // Limpiar el timeout anterior si existe
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Configurar un nuevo timeout
    searchTimeout.current = setTimeout(() => {
      func();
      setPagination(prev => ({ ...prev, currentPage: 1 }));
      setShouldFetch(true);
    }, 500);
  };

  // Manejadores de eventos con debounce manual
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(() => console.log("Buscando:", value));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFilters(prev => ({ ...prev, selectedCategory: value }));
    debouncedSearch(() => console.log("Categoría seleccionada:", value));
  };

  const resetFilters = () => {
    setFilters({ priceMin: 0, priceMax: 200000, selectedCategory: "" });
    setSearchTerm("");
    // Reiniciar inmediatamente
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setShouldFetch(true);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      console.log("Cambio de página a:", newPage);
      setPagination(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  // Limpiar el timeout cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  return (
    <div className="xl:flex-row flex flex-col p-4 gap-4 " >
      <div className="xl:hidden bg-white shadow-md p-4 rounded-lg flex flex-col  sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full sm:w-1/3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={filters.selectedCategory}
          onChange={handleCategoryChange}
          className="w-full sm:w-1/4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button onClick={resetFilters} className="text-blue-500 text-sm hover:underline">
          Limpiar filtros
        </button>
      </div>

      <div className=" hidden xl:flex xl:flex-col bg-white shadow-md  p-6   rounded-lg  flex-col sm:flex-row items-center gap-4 h-[450px] ">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={filters.selectedCategory}
          onChange={handleCategoryChange}
          className="w-full  px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
         
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button onClick={resetFilters} className="text-blue-500 text-sm hover:underline">
          Limpiar filtros
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex-1">
          {loading ? (
            <p className="text-center text-gray-500">Cargando productos...</p>
          ) : error ? (
            <p className="text-center text-red-500">
              Error al cargar productos. Por favor, inténtalo de nuevo.
            </p>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} handlePreview={handlePreview} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No se encontraron productos.</p>
          )}

          {pagination.totalPages > 1 && (
            <div className="flex justify-center py-6 space-x-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-3 py-1 border rounded-lg disabled:opacity-50"
              >
                ‹
              </button>
              <span>Página {pagination.currentPage} de {pagination.totalPages}</span>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-3 py-1 border rounded-lg disabled:opacity-50"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;