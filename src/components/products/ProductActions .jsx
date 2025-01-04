

const ProductActions = () => {
    return (
        <div className="flex flex-col space-y-3">
            <button className="w-full py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
                Agregar al carrito
            </button>
            <button className="w-full py-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">
                Comprar ahora
            </button>
        </div>
    )
}

export default ProductActions 