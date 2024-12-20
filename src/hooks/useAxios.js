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
                response = await axios.get(url, { params });
            } else {
                response = await axios({
                    method,
                    url,
                    data: body
                });
            }
            setData(response.data);
            
        } catch (err) {
            setError(err.message || 'Error en la petición');
        } finally {
            setLoading(false);
        }
    };


    
    return { data, loading, error, fetchData };
};

export default useAxios;
