import axios from 'axios'


import useAuth from '../../../../../Auth/useAuth'

import Notify from './Notify'

import './Notifications.scss'
import { useEffect } from 'react'

function Notifications({ setIsShow }) {
    const { auth, setAuth } = useAuth()
    const ntf = auth.notifications

    const deleteNotifications = async () => {
        try {
            const url = "http://localhost:9999/api/notifications/delete-all"
            const res = await axios.post(
                url, JSON.stringify("hihi"),
                {
                    headers: {
                        withCredentials: true,
                        credentials: "include",
                        Authorization: `Bearer ${auth.accessToken}`
                    }
                }
            )

            if (res.data.ok) setAuth(prev => ({ ...prev, notifications: [] }))

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth))
    }, [auth])

    return (
        <div className="Notifications">
            {console.log("From notifications: ", ntf)}
            {ntf.length > 0 &&
                <div className="Notifications__header">
                    <button onClick={() => deleteNotifications()}>Clear all</button>
                </div>
            }


            {
                ntf.length > 0 &&
                ntf.map((notify, index) => <Notify setIsShow={setIsShow} notify={notify} key={index} />)
            }

            {
                ntf.length == 0 && <p>No notifications available</p>
            }

        </div>
    )
}

export default Notifications