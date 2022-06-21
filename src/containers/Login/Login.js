import { Navigate } from 'react-router-dom'

import useAuth from '../../Auth/useAuth'

import Footer from './Footer.js'
import LoginForm from './LoginForm.js'

import './Login.scss'


function Login() {
    const { auth } = useAuth();

    return (<>
        {
            auth
                ?
                <Navigate to="/" />
                :
                <div className='Login'>
                    <LoginForm />
                    <Footer />
                </div>
        }
    </>
    )
}

export default Login