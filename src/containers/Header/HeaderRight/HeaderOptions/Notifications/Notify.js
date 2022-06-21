import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import useAuth from '../../../../../Auth/useAuth'

import RowItem from '../../../../../components/RowItem/RowItem'

import './Notify.scss'


function Notify({ notify, setIsShow }) {
    const { auth, setAuth } = useAuth()
    const notifyLink = "/post/" + notify.postID
    const navigate = useNavigate()

    const updateNotifications = async (id) => {
        if (notify.seen) return
        try {
            const response = await axios.put(
                "http://localhost:9999/api/notifications/update-seen",
                JSON.stringify({ id: id }),
                {
                    headers: {
                        withCredentials: true,
                        credentials: "include",
                        Authorization: `Bearer ${auth.accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            if (response.data.ok) {
                setAuth(prev => {
                    prev.notifications = prev.notifications.map(item => {
                        if (item.id === id) {
                            item.seen = true
                        }
                        return item
                    })
                    return prev
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const createNtf = (item) => {
        return `${item.name} đã ${item.type} bài viết của bạn`
    }

    return (
        <RowItem
            borderRadius="50%"
            image={notify.avatar}
            text={createNtf(notify)}
            onClick={() => { navigate(notifyLink); setIsShow("hide"); }}
        />
    )
}

export default Notify