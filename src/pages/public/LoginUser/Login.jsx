import { useEffect, useState } from "react";
import { ButtonComponent } from "../../../components/common/ButtonComponent";
import { debounceTime, Subject } from "rxjs";
import useAxios from "../../../hooks/useAxios";
import ButtonLoading from "../../../components/common/ButtonLoading";
import globalUrl from "../../../config/globalUrl";
import { useAuth } from "../../../hooks/authContext"
import { useNavigate } from "react-router-dom";


//declaramos los observable
const loginSend = new Subject();
const loginSend$ = loginSend.asObservable();
const Login = () => {


    //declaramos los estados
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: '',
        username: ''
    });
    const { fetchData, loading } = useAxios();
    const { setAuth, auth } = useAuth();

    const navigate = useNavigate();

    //creamos la funcion handled para manejar el estado para el formulario controlado
    const handledLoginData = (e) => {
        const { name, value } = e.target
        setFormLogin({
            ...formLogin,
            [name]: value,
            //igualamos lo que guardamos en email a username ya que en el backend buscara tanto por username y email
            username: name === "username" ? value : formLogin.email

        });
    }

    //creamos la 
    const hanledSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        loginSend.next(formLogin);
    }

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    //creamos la subscription con un useEffect para que solo se cree una vez
    useEffect(() => {

        let navigationTimer = null;
        const subscription = loginSend$.pipe(debounceTime(1000)).subscribe(async (data) => {

            try {
                const response = await fetchData(`${globalUrl}/users/login`, "POST", {}, data)
                if (response.status === true) {
                    console.log(response);
                    setAuth({
                        isAuthenticated: true,
                        user: response.data,
                        loading: false,
                    });

                    setMessage('Inicio de sesión exitoso. ¡Bienvenido!');
                    //redirigir a la pagina dashboard
                    navigate('/dashboard');


                }
            } catch (error) {
                setMessage("Error al Iniciar Sesión " + error.message);
            }
        })
        return () => {
            //destruimos la subscription para liberar memoria cuando se desmonte el componente
            subscription.unsubscribe();
            // Limpiar el temporizador al desmontar el componente
            if (navigationTimer) clearTimeout(navigationTimer);
        }
    }, [])


    if (auth.isAuthenticated) {
        navigate('/dashboard');
    }

    return (
        <div className="flex justify-center items-center z50">
            <div className="bg-white rounded-md p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-black">Iniciar Sesión </h2>
                {message && (
                    <p className={`mb4  p3 rounded ${message.includes('Error') ?
                        "text-red-600 bg-red-50" :
                        "text-green-600 bg-green-50"}`}>
                        {message}
                    </p>
                )}
                <form onSubmit={hanledSubmit}>
                    <div className="mb-4">
                        <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
                            Correo Electronico
                        </label>
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="email@ejemplo.com o nombre de usuario"
                            name="email"
                            value={formLogin.email}
                            onChange={handledLoginData}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Contraseña"
                                name="password"
                                value={formLogin.password}
                                onChange={handledLoginData}
                                type={showPassword ? "text" : "password"}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                    </svg>
                                )}
                            </button>
                        </div>

                    </div>
                    {
                        loading ? <ButtonLoading /> : <ButtonComponent text='Iniciar Sesión' />
                    }

                </form>
            </div>
        </div>
    )
}

export default Login