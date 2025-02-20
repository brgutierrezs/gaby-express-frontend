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
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Contraseña"
                            name="password"
                            value={formLogin.password}
                            onChange={handledLoginData}
                        />
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