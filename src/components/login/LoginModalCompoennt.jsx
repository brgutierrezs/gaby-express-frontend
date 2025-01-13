import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/authContext';
import useAxios from '../../hooks/useAxios';
import { useEffect, useState } from 'react';
import globalUrl from '../../config/globalUrl';

const LoginModalCompoennt = ({ modalRef, toggleLoginModal }) => {
  const { auth, setAuth } = useAuth();
  const { data, error, fetchData, loading } = useAxios();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handledLoginData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value
    });
  };

  const hanledSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    await fetchData(globalUrl + '/users/login', 'POST', {}, loginData);
  };

  useEffect(() => {
    if (data?.data) {
      // Actualiza el estado de autenticación
      setAuth({
        isAutenticated: true,
        user: data.data,
        loading: false,
        cookie: auth.cookie
      });

      // Establece el mensaje de éxito
      setMessage('Inicio de sesión exitoso. ¡Bienvenido!');
      
    } else if (error) {
      // Establece el mensaje de error del backend
      setMessage(`Error al iniciar sesión: ${error.message}`);
    }
  }, [data, error, auth.cookie, setAuth, message]);

if (loading) {
    return <p>Cargando...</p>;
  
}

  return (
    <>
      <div className="bg-white rounded-md p-6 w-full max-w-md" ref={modalRef}>
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Iniciar Sesión</h2>

        {data?.data ? <p className='text-green-400'>{message}</p> : <p className="text-red-600">{message}</p>}

        <form onSubmit={hanledSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
              placeholder="correo@ejemplo.com"
              onChange={handledLoginData}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-500"
              placeholder="********"
              onChange={handledLoginData}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
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
  );
};

LoginModalCompoennt.propTypes = {
  toggleLoginModal: PropTypes.func.isRequired,
  modalRef: PropTypes.any.isRequired
};

export default LoginModalCompoennt;
