import { useState, useEffect, useRef } from 'react'

import useAuth from '../../../Auth/useAuth'
import useSearchAxios from '../../../APIs/apiServices/useSearchAxios'
import axiosInstance from '../../../APIs/APIs'

import RowItem from '../../../components/RowItem/RowItem'
import FBLogo from './FBLogo'
import SearchItem from './SearchItem'
import SearchInput from './SearchInput'

import './HeaderLeft.scss'


function HeaderLeft() {
    const [onFocus, setOnFocus] = useState(false)
    const { auth } = useAuth()
    const searchRef = useRef()

    const [result, setResult, error, loading, query, setQuery] = useSearchAxios(
        {
            axiosInstance,
            method: 'get',
            requestConfig: {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                }
            },
        }
    )

    const handleClick = (item) => {
        setOnFocus(false)
        setQuery('')
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!searchRef.current.contains(e.target)) {
                setOnFocus(false)
                setQuery('')
                setResult([])
            }
        }

        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [])

    const Header__left__group = onFocus ? "Header__left__group active" : "Header__left__group"

    return (
        <div className="Header__left">
            <div ref={searchRef} className={Header__left__group} >

                <div className="Header__left__top">
                    <FBLogo />
                    <SearchInput query={query} setQuery={setQuery} setOnFocus={setOnFocus} />
                </div>

                <ul>
                    {result.length > 0 && onFocus && result.map((item, index) => <SearchItem item={item} handleClick={handleClick} key={index} />)}
                    {result.length === 0 && onFocus && query && <RowItem leftIcon={<i className="fa fa-angry"></i>} text="No results" />}
                    {onFocus && !query && <span style={{ fontSize: "15px" }}>Search for people and posts</span>}
                    {loading && <li>Loading...</li>}
                    {error && <li>{error}</li>}
                </ul>

            </div>
        </div>
    )
}

export default HeaderLeft