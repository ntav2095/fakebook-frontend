import { useState, useEffect } from 'react'

const useNormalAxios = configObj => {
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

export default useNormalAxios