import { useState, createContext } from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const x = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null

    const [auth, setAuth] = useState(x)

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider