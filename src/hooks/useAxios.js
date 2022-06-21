import { useState, useEffect } from 'react'

export const useAccumulatedAxios = (configObj) => {
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

export const useSearchAxios = (configObj) => {
    const {
        axiosInstance,
        method,
        url = 'search/',
        requestConfig = {}
    } = configObj;


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('')

    useEffect(() => {
        if (!query) {
            setData([])
            return
        }

        const controller = new AbortController();
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await axiosInstance[method.toLowerCase()](url + query, { ...requestConfig, signal: controller.signal })
                setData(res.data.data);
            } catch (error) {
                console.log(error)
                setError(error.message)
            } finally {
                setLoading(false)
            }

        }

        fetchData()
        return () => controller.abort()

    }, [query])
    return [data, setData, error, loading, query, setQuery]
}

export const useNormalAxios = configObj => {
    const {
        axiosInstance,
        method,
        url,
        requestConfig = {}
    } = configObj;

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        const request = async () => {
            try {
                setLoading(true)
                const res = await axiosInstance[method.toLowerCase()](
                    url, {
                    ...requestConfig, signal: controller.signal
                })
                setData(res.data.data);
                (res.data.ok) ? setSuccess(true) : setSuccess(false)
            } catch (error) {
                console.log(error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        request()

        return () => controller.abort()
    }, [url])
    return [loading, error, data, setData, success]
}