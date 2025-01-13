import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import useAxios from "./useAxios";
import globalUrl from "../config/globalUrl";

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

    const { data, error, fetchData, loading } = useAxios();

    const [auth, setAuth] = useState({
        isAutenticated: false,
        user: null,
        loading: true,
        cookie: null
    });
    // useEffect para verificar la session
    useEffect(() => {

        const obtainCookie = async () => {
            try {
                
                await fetchData(globalUrl + "/users//get-cookie", 'GET');
                setAuth({
                   cookie: data.cookie
                })
            } catch  {
                console.error('Error al obtener el token')
            }
        }

        const checkAuth = async () => {

            try {
                
                await fetchData(globalUrl + "/users/get-profile?id=1", 'GET');


            } catch {
                setAuth({
                    isAutenticated: false,
                    user: null,
                    loading: false
                })
            }
        }
        obtainCookie();
        checkAuth();
    }, [])

    if (loading) return <p>Cargando...</p>
    console.log('datos del fetch obtener profile', data)
    console.log('datos del error', error);
    
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )

}


AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};



