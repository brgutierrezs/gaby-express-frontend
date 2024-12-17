export const ButtonComponent = () => {
    return (
        <div>
            <button
                className="mt-4 w-full bg-red-600 text-white py-2 rounded-md 
                hover:bg-red-700 
                active:scale-95 
                focus:outline-none 
                focus:ring-4 
                focus:ring-red-300 
                transition-all 
                duration-300 
                ease-in-out 
                transform 
                hover:-translate-y-1 
                hover:shadow-lg 
                active:translate-y-0 
                active:shadow-sm"
            >
                Registrarse
            </button>
        </div>
    );
};