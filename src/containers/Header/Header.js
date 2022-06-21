
import { Outlet, useParams, useOutletContext } from 'react-router-dom'

import HeaderLeft from './HeaderLeft/HeaderLeft'
import HeaderRight from './HeaderRight/HeaderRight'
import Chat from '../../components/Chat/Chat'

import './Header.scss'

function Header() {
    const { email, pid } = useParams()
    return (<>

        <div className="Header">
            <HeaderLeft />
            <HeaderRight />
        </div>

        <Chat />
        <div key={email}>
            <Outlet />
        </div>

    </>)
}

export default Header