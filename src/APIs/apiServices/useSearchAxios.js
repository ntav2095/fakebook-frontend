import { useState, useEffect } from 'react'

const useSearchAxios = (configObj) => {
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

export default useSearchAxios