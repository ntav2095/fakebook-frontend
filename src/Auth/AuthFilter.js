import useAuth from "./useAuth"
import { useLocation, Outlet, Navigate } from "react-router-dom"


const AuthFilter = () => {
    const { auth } = useAuth()
    const location = useLocation()
    return (<>
        {
            auth
                ? <Outlet />
                : <Navigate to="login" replace state={{ from: location }} />
        }
    </>)
}

export default AuthFilter