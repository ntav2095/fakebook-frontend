import axios from 'axios'
import { useEffect } from 'react'


import useAuth from '../../../../../Auth/useAuth'

import RowItem from '../../../../../components/RowItem/RowItem'

import './FriendRequest.scss'


function FriendRequest() {
    const handleFriendRequest = async (type, userEmail) => {
        try {
            const response = await axios.post(
                "http://localhost:9999/api/user/friend-request",
                JSON.stringify({ authEmail: auth.email, recEmail: userEmail, type: type }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        withCredentials: true,
                        credentials: "include",
                        Authorization: `Bearer ${auth.accessToken}`
                    }
                }
            )

            if (response.data.ok) {
                setAuth(prev => ({ ...prev, friendRequest: response.data.authFriendRequest, friends: response.data.authFriends }))
            } else {
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const { auth, setAuth } = useAuth()
    const frRequest = auth.friendRequest


    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth))
    }, [auth])

    return (
        <div className="FriendRequest">
            {frRequest.length > 0 &&
                <ul>
                    {frRequest.map(item =>
                        <li>
                            <RowItem image={item.avatar} text={`${item.name} da gui cho ban mot loi moi ket ban`} />
                            <div className="frRequestBtns">
                                <button onClick={() => handleFriendRequest('dongy', item.email)} >Accept</button>
                                <button onClick={() => handleFriendRequest('tuchoi', item.email)} >Decline</button>
                            </div>
                        </li>
                    )}
                </ul>
            }

            {
                frRequest.length === 0 && <ul><li><RowItem text="There's no friend request" /> </li></ul>
            }
        </div>
    )
}

export default FriendRequest