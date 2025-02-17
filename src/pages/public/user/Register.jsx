import { useNavigate } from "react-router-dom"
import { ButtonComponent } from "../../../components/common/ButtonComponent"
import { useAuth } from "../../../hooks/authContext"
import { debounceTime, Subject } from "rxjs";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import globalUrl from '../../../config/globalUrl'

//validar si la session esta iniciada para redirigir al dashboard o index
const registerSend = new Subject();
const registerSend$ = registerSend.asObservable();

export const Register = () => {

    const { auth } = useAuth(); //llamada al auth para saber si esta authenticado
    const navigate = useNavigate(); //usamos el usenavigate para redirigir
    const { fetchData, loading } = useAxios(); //llamamos a nuestro hook useAxios

    const [registerForm, setRegisterForm] = useState({
        email: '',
        password: '',
        username: ''


    }); // creamos el estado que tendra los datos del registro
    const [message, setMessate] = useState('');

    //creamos el handled del formulario para capturar los datos de este
    const handledRegisterData = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.id]: e.target.value
        });
    };

    //creamos el handledSubmit para enviar el formulario
    const handledSubmit = (e) => {
        e.preventDefault();
        setMessate('');
        registerSend.next(registerForm);
    }

    //usamos el useEffect para crear la susbscription una sola vez la cual la usaremos cada vez que la funcion handledSubmit se ejecute
    useEffect(() => {

        //creamos la susbcription
        const subscription = registerSend$.pipe(debounceTime(1000)).subscribe(async (form) => {

            try {
                //hacemos la peticion
                const response = await fetchData(globalUrl + '/users/register', 'POST', {}, form);
                console.log(response);
            } catch (error) {
                setMessate(`Error al registrarse: '  ${error.message}`);
            }
        });

        return () => {
            return subscription.unsubscribe();
        }
    }, [])


    if (auth.isAuthenticated) {
        navigate("/", true);
    }

    console.log(message, registerForm);

    return (


        <div className="flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-black">Register</h2>
                {message && (
                    <p className={`mb-4 p-3 rounded ${message.includes("Error") ?
                        "text-red-600 bg-red-50" :
                        "text-green-600 bg-green-50"}`}>
                        {message}
                    </p>
                )}

                <form onSubmit={handledSubmit}>

                    <div className="mb-4">
                        <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
                            Nombre de usuario
                        </label>
                        <input
                            id="username"
                            type="usuario"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder=" Nombre"
                            onChange={handledRegisterData}
                            value={registerForm.username}
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
                            onChange={handledRegisterData}
                            value={registerForm.password}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="email@ejemplo.com"
                            onChange={handledRegisterData}
                            value={registerForm.email}
                        />
                    </div>

                    <ButtonComponent />

                </form>

            </div>

        </div>

    )
}
