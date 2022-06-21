import { Link } from 'react-router-dom'
import axios from 'axios'

import axiosInstance from '../../../../../APIs/APIs'

import useAuth from '../../../../../Auth/useAuth'
import useChat from '../../../../../Context/useChat'

import RowItem from '../../../../../components/RowItem/RowItem'

import './HeaderMenu.scss'

const LINKS = [
    {
        desc: "Privacy",
        link: "/"
    },
    {
        desc: "Terms",
        link: "/"
    },
    {
        desc: "Advertising",
        link: "/"
    },
    {
        desc: "Ad choices",
        link: "/"
    },
    {
        desc: "Cookies",
        link: "/"
    }
]

function HeaderMenu() {
    const { auth, setAuth } = useAuth()
    const { setShowChat } = useChat()
    const handleLogout = async () => {
        localStorage.removeItem('auth')
        setShowChat(false)
        setAuth(null)

        try {
            const response = await axiosInstance.post(
                "/logout",
                JSON.stringify({ email: auth.email, accessToken: auth.accessToken }),
                {
                    headers: {
                        // withCredentials: true,
                        // credentials: 'include',
                        Authorization: `Bearer ${auth.accessToken}`,
                        // 'Content-Type': 'application/json',
                    }
                }
            )
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="HeaderMenu">


            <RowItem
                onClick={handleLogout}
                leftIcon={<i className="fa fa-door-open"></i>}
                borderRadius="50%"
                text="Log out"
            />
            <footer>
                <ul>
                    {LINKS.map((item, index) =>
                        <li key={index}>
                            <Link to={item.link}>{item.desc}</Link>
                        </li>
                    )}
                </ul>

                <div>
                    <Link to="/">More</Link>
                    <span>Meta © 2022</span>
                </div>
            </footer>
        </div>
    )
}

export default HeaderMenu