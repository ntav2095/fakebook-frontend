import { useState, useRef } from 'react'
import axios from 'axios'

import useAuth from '../../../Auth/useAuth'

import HeaderOptions from './HeaderOptions/HeaderOptions'
import HeaderRightUserInfo from './HeaderRightUserInfo'

import './HeaderRight.scss'

const UPADTE_NTF_API = "http://localhost:9999/api/notifications/update-seen"

function HeaderRight() {
    const { auth } = useAuth()
    const [isShow, setIsShow] = useState('hide')
    const messengerRef = useRef()
    const notificationsRef = useRef()
    const friendRequestRef = useRef()
    const menuRef = useRef()
    // const { auth, setAuth } = useAuth()

    const handleShow = (type) => {
        isShow === type ? setIsShow('hide') : setIsShow(type)
    }

    const ACTION_BTNS = [
        {
            className: "messenger",
            icon: <i className="fab fa-facebook-messenger" />,
            ref: messengerRef
        },
        {
            className: "notifications",
            icon: <i className="fa fa-bell" />,
            ref: notificationsRef
        },
        {
            className: "friendRequest",
            icon: <i className="fa fa-user-friends" />,
            ref: friendRequestRef
        },
        {
            className: "menu",
            icon: <i className="fa fa-sort-down" />,
            ref: menuRef
        },
    ]

    // const updateNotifications = async () => {
    //     const res = await axios.post(UPADTE_NTF_API, "", HEADERS)
    //     if (res.data.ok) {
    //         setAuth(prev => (
    //             {
    //                 ...prev,
    //                 notifications: prev.notifications.map(item => ({ ...item, seen: true }))
    //             }
    //         )
    //         )
    //         localStorage.setItem("auth", JSON.stringify(auth))
    //     }
    // }

    return (
        <div className="Header__right">
            <HeaderRightUserInfo />
            <ul>
                {ACTION_BTNS.map((item, index) => (
                    <li
                        key={index}
                        ref={item.ref}
                        className={item.className + " " + "actionBtn"}
                        onClick={() => handleShow(item.className)}
                    >
                        {item.icon}
                        {/* {auth[item.className].filter(item => !item.seen).length > 0 &&
                            <span className="qty">{auth.notifications.length}</span>} */}

                        {auth.friendRequest.length > 0 && item.className === 'friendRequest' && <span className="qty">{auth.friendRequest.length}</span>}
                    </li>
                ))}


                {isShow !== "hide" && <HeaderOptions
                    messengerRef={messengerRef}
                    notificationsRef={notificationsRef}
                    friendRequestRef={friendRequestRef}
                    menuRef={menuRef}
                    setIsShow={setIsShow}
                    isShow={isShow}
                />}
            </ul>
        </div >
    )
}

export default HeaderRight