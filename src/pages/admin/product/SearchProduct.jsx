import { useEffect, useState } from "react";
import ProductCard from "../../../components/products/ProductCard";
import useAxios from "../../../hooks/useAxios";
import globalUrl from "../../../config/globalUrl";

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [filters, setFilters] = useState({
    priceRange: {
      min: 0,
      max: 200000,
    },
    selectedCategories: [],
    priceMin: 0,
    priceMax: 200000,
  });

  const { data, loading, error, fetchData } = useAxios();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      await fetchData(globalUrl + "/product/all-product", 'GET');
    };
    fetchProducts();
  }, []);

  // Fetch categories from API
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchData(globalUrl + '/product/all-category', 'GET');
        if (response?.categories) {
          setCategories(response.categories);
        }
      } catch (error) {
        setMessage(`Error al obtener las categorias: ${error?.message || 'Desconocido'}`);
      }
    };
    getCategories();
  }, []);

  // Process product data
  useEffect(() => {
    if (data?.products) {
      const productsData = data.products;
      setProducts(productsData);
      setFilteredProducts(productsData);
      
      // Find min and max prices
      const prices = productsData.map(product => parseFloat(product.price));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setFilters(prev => ({
        ...prev,
        priceRange: { min: minPrice, max: maxPrice },
        priceMin: minPrice,
        priceMax: maxPrice,
      }));
    }
  }, [data]);

  // Apply filters
  useEffect(() => {
    if (products.length > 0) {
      let result = [...products];
      
      // Filter by search term
      if (searchTerm.trim() !== "") {
        const term = searchTerm.toLowerCase();
        result = result.filter(product => 
          product.title?.toLowerCase().includes(term) || 
          product.description?.toLowerCase().includes(term)
        );
      }
      
      // Filter by selected categories
      if (filters.selectedCategories.length > 0) {
        result = result.filter(product => 
          filters.selectedCategories.includes(product.category)
        );
      }
      
      // Filter by price range
      result = result.filter(product => {
        const price = parseFloat(product.price);
        return price >= filters.priceMin && price <= filters.priceMax;
      });
      
      setFilteredProducts(result);
    }
  }, [searchTerm, filters.selectedCategories, filters.priceMin, filters.priceMax, products]);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setFilters(prev => {
      const isSelected = prev.selectedCategories.includes(category);
      let newSelectedCategories;

      if (isSelected) {
        newSelectedCategories = prev.selectedCategories.filter(cat => cat !== category);
      } else {
        newSelectedCategories = [...prev.selectedCategories, category];
      }

      return {
        ...prev,
        selectedCategories: newSelectedCategories,
      };
    });
  };

  // Handle price range change
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters(prev => ({
      ...prev,
      selectedCategories: [],
      priceMin: prev.priceRange.min,
      priceMax: prev.priceRange.max,
    }));
    setSearchTerm("");
  };

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
    <div className="flex flex-col">
      {/* Search Bar */}
      <div className="p-4 bg-white border-b">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              🔍
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        {/* Filter Sidebar */}
        <div className="w-64 p-4 border-r bg-gray-50">
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2">Filtros</h3>
            <button 
              onClick={resetFilters}
              className="text-sm text-blue-500 hover:underline"
            >
              Limpiar filtros
            </button>
          </div>

          {/* Categories Filter */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Categorías</h4>
            {message && <p className="text-red-500 text-sm">{message}</p>}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {categories && categories.length > 0 ? (
                categories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={filters.selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`category-${category.id}`} className="text-sm">
                      {category.name}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Cargando categorías...</p>
              )}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Rango de Precio</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm">Mínimo: ${filters.priceMin}</label>
                <input
                  type="range"
                  name="priceMin"
                  min={filters.priceRange.min}
                  max={filters.priceRange.max}
                  value={filters.priceMin}
                  onChange={handlePriceChange}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm">Máximo: ${filters.priceMax}</label>
                <input
                  type="range"
                  name="priceMax"
                  min={filters.priceRange.min}
                  max={filters.priceRange.max}
                  value={filters.priceMax}
                  onChange={handlePriceChange}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>${filters.priceRange.min}</span>
                <span>${filters.priceRange.max}</span>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="text-sm text-gray-500">
            {filteredProducts.length} productos encontrados
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 box-border">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPreview={handlePreview}
                handleAddToCart={handleAddToCart}
              />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No se encontraron productos con los filtros seleccionados.</p>
                <button 
                  onClick={resetFilters} 
                  className="mt-2 text-blue-500 hover:underline"
                >
                  Restablecer filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;