import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/authContext';
import useAxios from '../../hooks/useAxios';
import { useEffect, useState } from 'react';
import globalUrl from '../../config/globalUrl';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../common/Loading';
import { debounceTime, Subject } from 'rxjs';


//creamos nuestro observable
const loginSend = new Subject();
const loginSend$ = loginSend.asObservable();

const LoginModalComponent = ({ modalRef, toggleLoginModal }) => {
  const { setAuth } = useAuth();
  const {   fetchData, loading } = useAxios();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    loginSend.next(loginData);
  };

  const handleResendActivation = async () => {
    try {
      await fetchData(globalUrl + '/users/resend-activation', 'POST', {}, { email: loginData.email });
      setMessage('Se ha enviado un nuevo enlace de activación a tu correo');
    } catch {
      setMessage('Error al enviar el enlace de activación');
    }
  };

  useEffect(() => {

    //creamos la susbscription para controlar la cantidad de peticiones
    const loginSendSubcription = loginSend$.pipe(debounceTime(500)).subscribe(async (formData) => {

      try {
        const response = await fetchData(globalUrl + '/users/login', 'POST', {}, formData);

        setAuth({
          isAuthenticated: true,
          user: response.data,
          loading: false,
        });
        setMessage('Inicio de sesión exitoso. ¡Bienvenido!');
        navigate('/dashboard');
      } catch (error) {
        // Aquí capturamos el error que lanza useAxios
        setMessage(`Error al iniciar sesión: ${error.message}`);
      }
    });

    return () => {
      return loginSendSubcription.unsubscribe();
    }

  }, [fetchData, setAuth, navigate]);

  return (
    <>
      {loading ? (<Loading message={"Iniciando Sesión"} />) : (
        <div className="bg-white rounded-md p-6 w-full max-w-md" ref={modalRef}>
          <h2 className="text-2xl font-bold mb-4 text-center text-black">Iniciar Sesión</h2>

          {message && (
            <p className={`mb-4 p-3 rounded ${message.includes("Error") ?
              "text-red-600 bg-red-50" :
              "text-green-600 bg-green-50"}`}>
              {message}
            </p>
          )}

          {message === "Error al iniciar sesión: Su cuenta se encuentra desactivada" && (
            <div className="mb-4 p-4 bg-yellow-50 rounded-md">
              <p className="text-gray-700">
                ¿Necesitas reactivar tu cuenta?
              </p>
              <button
                onClick={handleResendActivation}
                className="mt-2 w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-200"
              >
                Enviar nuevo enlace de activación
              </button>
            </div>
          )}

          {message === "Error al iniciar sesión: Correo No Registrado" && (
            <div className="mb-4 text-center">
              <p className="text-gray-700 mb-2">¿No tienes una cuenta?</p>
              <Link
                to="register"
                onClick={toggleLoginModal}
                className="inline-block w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 text-center"
              >
                Crear cuenta nueva
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                placeholder="correo@ejemplo.com"
                onChange={handleLoginData}
                value={loginData.email}
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
                onChange={handleLoginData}
                value={loginData.password}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200"
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <button
            className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition duration-200"
            onClick={toggleLoginModal}
          >
            Cancelar
          </button>
        </div>
      )}
    </>
  );
};

LoginModalComponent.propTypes = {
  toggleLoginModal: PropTypes.func.isRequired,
  modalRef: PropTypes.any.isRequired
};

export default LoginModalComponent;