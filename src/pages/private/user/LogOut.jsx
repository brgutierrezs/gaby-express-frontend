import { useAuth } from '../../../hooks/authContext'
import useAxios from '../../../hooks/useAxios';
import { useEffect } from 'react';
import globalUrl from '../../../config/globalUrl';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/common/Loading';
const LogOut = () => {

    //llamamos al useauth para acceder a los datos del usuario el cual posee la cookie
    const { setAuth, error, loading } = useAuth();

    //llamamos al useAxios para poder realizar peticiones al servidor
    const { fetchData } = useAxios();

    //creamos el navigate para redirigir
    const navigate = useNavigate();
    //creamos un useEffect que se encaragara de gestionar el cierre de sesion
    useEffect(() => {

        const logAuthOut = async () => {

            //creamos la peticion para limpiar la cookie
            const data = await fetchData(globalUrl + '/users/clean-cookie', 'GET');
            console.log(data);
            //si la data entrega un succes debemos setear el estado auth a null 
            if (data?.status === "success") {
                setAuth({
                    isAuthenticated: false,
                    user: null,
                    loading: false,
                    cookie: null,
                    error: null
                });

                //redireccionamos al usuario al inicio y colocamos replace true para que no pueda volver atras
                navigate('/', { replace: true });
            }

        };

        logAuthOut();
    }, []);


    if (error) {
        <div className="text-red-500">
            Error al cerrar sesión: {error.message}
            <p>Redirigiendo al inicio...</p>
        </div>

    }
    

    return (
        <div className="text-center">
            {loading ? <Loading/> : null}
        </div>
    )
}

export default LogOut