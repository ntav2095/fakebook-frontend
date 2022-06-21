import { useRef, useEffect } from 'react'

import Notifications from './Notifications/Notifications'
import HeaderMenu from './HeaderMenu/HeaderMenu'
import FriendRequest from './FriendRequest/FriendRequest'
import Messenger from './Messenger/Messenger'

import './HeaderOptions.scss'

function HeaderOptions({ isShow, setIsShow, messengerRef, notificationsRef, friendRequestRef, menuRef, }) {

    const headerOptionRef = useRef()

    useEffect(() => {
        const handleCickOutside = (e) => {
            if (headerOptionRef.current) {
                if (
                    !headerOptionRef.current.contains(e.target) &&
                    !messengerRef.current.contains(e.target) &&
                    !notificationsRef.current.contains(e.target) &&
                    !friendRequestRef.current.contains(e.target) &&
                    !menuRef.current.contains(e.target)
                ) setIsShow("hide")

            }
        }

        document.addEventListener("click", handleCickOutside)
        return () => document.removeEventListener("click", handleCickOutside)
    }, [])


    return (<>
        {
            isShow !== "hide" &&
            <div ref={headerOptionRef} className="HeaderOptions">
                {isShow === "notifications" && <Notifications setIsShow={setIsShow} />}
                {isShow === "menu" && <HeaderMenu setIsShow={setIsShow} />}
                {isShow === "friendRequest" && <FriendRequest setIsShow={setIsShow} />}
                {isShow === "messenger" && <Messenger setIsShow={setIsShow} />}
            </div>
        }
    </>)
}

export default HeaderOptions