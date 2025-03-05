import PropTypes from 'prop-types';

export const ButtonComponent = ({ text }) => {

    return (
        <>
            <button
                className="mt-4 max-w-md bg-red-600 text-white py-2 rounded-md w-full
        hover:bg-red-700 
        active:scale-95 
        focus:outline-none 
        focus:ring-4 
        focus:ring-red-300 
        transition-all 
        duration-300 
        ease-in-out  
        hover:-translate-y-1 
        hover:shadow-lg 
        active:translate-y-0 
        active:shadow-sm"
            >
                {text}
            </button>



        </>

    );


};

ButtonComponent.propTypes = {
    text: PropTypes.string
};
