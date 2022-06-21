import { useState, useEffect } from 'react'

const useAccumulatedAxios = (configObj) => {
    const {
        axiosInstance,
        method,
        url,
        requestConfig = {}
    } = configObj;

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(1)
    const [data, setData] = useState([])
    const [loadMore, setLoadMore] = useState(false)

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const res = await axiosInstance[method.toLowerCase()](url + `${offset}`, {
                    ...requestConfig,
                    signal: controller.signal
                });
                if (res.data.data.length > 0) {
                    setData(prev => ([...res.data.data, ...prev]));
                    setOffset(prev => prev + 1)
                    setError('')
                }
            } catch (error) {
                console.log(error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData();

        return () => controller.abort();
    }, [loadMore])


    return [data, setData, error, loading, setLoadMore];
}

export default useAccumulatedAxios