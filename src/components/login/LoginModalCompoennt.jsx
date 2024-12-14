import PropTypes from 'prop-types'


const LoginModalCompoennt = ({modalRef, toggleLoginModal}) => {
    
  return (
    <>
      {/* Modal content */}
      <div className="bg-white rounded-md p-6 w-full max-w-md" ref={modalRef}>
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Iniciar Sesión</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="correo@ejemplo.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
          >
            Iniciar Sesión
          </button>
        </form>

        <button
          className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
          onClick={toggleLoginModal}
        >
          Cancelar
        </button>
      </div>
      </>
  )
}

LoginModalCompoennt.propTypes = {
    isLoginOpen: PropTypes.bool.isRequired,
    toggleLoginModal: PropTypes.func.isRequired,
    modalRef: PropTypes.any.isRequired
  }

export default LoginModalCompoennt