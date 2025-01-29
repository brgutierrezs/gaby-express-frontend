import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import useAxios from "./useAxios";
import globalUrl from "../config/globalUrl";
import Loading from "../components/common/Loading";

const AuthContext = createContext();

//cramos el custom hook para consumir el context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};


export const AuthProvider = ({ children }) => {

    const { error, fetchData, loading } = useAxios();

    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: null,
        loading: true,
        cookie: null,
        error: null
    });
    // useEffect para verificar la session
    useEffect(() => {

        const checkAuthentication = async () => {
            try {

                //obtener cookie
                const cookieResponse = await fetchData(globalUrl + "/users//get-cookie", 'GET');

                //preguntamos si la cookie viene en la data
                const cookieValue = cookieResponse?.cookie;

                //obtener perfil de usuario
                const userResponse = await fetchData(globalUrl + "/users/get-profile", 'GET');

                //preguntamos si el perfil de usuario viene en la data
                const userProfile = userResponse?.user;

                // Si ambas peticiones son exitosas
                if (cookieValue && userProfile) {
                    setAuth({
                        isAuthenticated: true,
                        user: userProfile,
                        loading: false,
                        cookie: cookieValue,
                        error: null
                    });
                } else {

                    // Si no se obtiene la cookie o el perfil del usuario
                    throw new Error('Datos de autenticación incompletos');
                }
            } catch (err) {
                // Manejo de errores
                console.error('Error de autenticación:', err.message);
                error ? console.error('Error del end point :', error) : null;

                // Actualiza el estado de autenticación
                setAuth({
                    isAuthenticated: false,
                    user: null,
                    loading: false,
                    cookie: null,
                });
            }
        }

        checkAuthentication();
    }, [])

    if (loading) return <Loading />;
    //console log para verificar el estado de autenticación
    // console.log(auth.isAuthenticated )
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )

}


AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};



