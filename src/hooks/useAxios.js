import { useState } from "react";
import axios from "axios";

const useAxios = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (url, method = "GET", params = {}, body = null) => {
        setLoading(true);
        setError(null);
        try {
            let response;

            if (method === "GET") {
                response = await axios.get(url, {
                    params,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // Permite enviar cookies
                });
            } else {
                response = await axios({
                    method,
                    url,
                    data: body,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // Permite enviar cookies
                });
            }

            setData(response.data); // Actualiza el estado global del hook

            return response.data; // Retorna los datos obtenidos
        } catch (err) {
            const message = err.response?.data?.message || "Error en la petición";
            const status = err.response?.status || 500;

            setError({ status, message }); // Guarda el error en el estado del hook
            throw { status, message }; // Lanza el error para manejarlo en el componente
        } finally {
           
            setLoading(false);
           
        }
    };

    return { data, loading, error, fetchData };
};

export default useAxios;
