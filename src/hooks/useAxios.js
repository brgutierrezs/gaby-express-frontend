import { useState } from "react";
import axios from 'axios';

const useAxios = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (url, method = 'GET', params = {}, body = null) => {
        setLoading(true);
        setError(null);
        try {
            let response;

            if (method === 'GET') {
                response = await axios.get(url, {
                    params,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Permite enviar cookies
                });
            } else {
                response = await axios({
                    method,
                    url,
                    data: body,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Permite enviar cookies
                });
            }
            setData(response.data);
        } catch (err) {
            // Captura el mensaje del backend si existe
            const message = err.response?.data?.message || 'Error en la petición';
            setError({ status: err.response?.status, message });
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchData };
};

export default useAxios;
