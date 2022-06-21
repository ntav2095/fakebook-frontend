import { Link } from 'react-router-dom'
import { useState } from 'react'

import useAuth from '../../Auth/useAuth'
import axiosInstance from '../../configs/axiosConfig'

import "./LoginForm.scss"

const SLOGAN = "Fakebook helps you connect and share with the people in your life."

function LoginForm() {
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [err, setErr] = useState('')
    const { setAuth } = useAuth()

    const handleLogin = (e) => {
        e.preventDefault()

        const requestLogin = async () => {
            if (!(user.trim()) || !(pwd.trim())) return
            try {
                const response = await axiosInstance.post(
                    '/login',
                    JSON.stringify({ email: user, password: pwd })
                )

                const data = response.data
                if (data?.ok) {
                    setAuth(data.user)
                    localStorage.setItem('auth', JSON.stringify(data.user))
                    setErr('')
                } else {
                    setErr('Logined failed')
                }
            } catch (error) {
                setErr(error.message)
                console.log(error)
            }
        }

        requestLogin()
    }

    return (
        <div className="LoginForm">
            <div className="LoginForm__slogan">
                <h1>Fakebook</h1>
                <p>{SLOGAN}</p>
            </div>

            <form onSubmit={handleLogin}>

                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    autoComplete='off'
                    placeholder='email'
                />

                <input
                    type="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    autoComplete='off'
                    placeholder='password'
                />

                <p className="errorMessage">{err}</p>

                <input type="submit" value="Log In" />

                <Link to="/register" className="forgotPassword">Forgotten password?</Link>

                <button type="button">Create New Account</button>
            </form>
        </div>
    )
}

export default LoginForm