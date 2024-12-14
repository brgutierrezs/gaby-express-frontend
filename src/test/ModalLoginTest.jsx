import PropTypes from "prop-types";
import { useEffect, useRef } from "react"


const ModalLoginTest = ({ isLoginOpen, toggleLoginModal }) => {


    const modalRef = useRef(null);



    useEffect(() => {

        const closeModal = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                toggleLoginModal();
            }
        }

        document.addEventListener('mousedown', closeModal);

        return () => {
            document.removeEventListener('mousedown', closeModal)
        }
    }, [toggleLoginModal])

    if (!isLoginOpen) return null



    return (
        <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
            {/* Modal content */}
            <div className=" bg-white rounded-md p-6 w-full max-w-md" ref={modalRef}>
                <h2 className="text-black text-2xl font-bold mb-4 text-center">Iniciar Sesion</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="correo@ejemplo.com"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

ModalLoginTest.propTypes = {
    isLoginOpen: PropTypes.bool.isRequired,
    toggleLoginModal: PropTypes.func.isRequired
}

export default ModalLoginTest