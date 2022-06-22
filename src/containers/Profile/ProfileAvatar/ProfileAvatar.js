import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import useAuth from '../../../Auth/useAuth'

import './ProfileAvatar.scss'

const CHANGE_AVATAR = `${process.env.REACT_APP_API_URL}/api/user/change-avatar`
const REMOVE_AVATAR = `${process.env.REACT_APP_API_URL}/api/user/remove-avatar`
const NO_AVATAR = "asset/no-avatar.png"

function ProfileAvatar({ user, setUser, setPosts }) {
    const [avatarInput, setAvatarInput] = useState(null)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const [imgKey, setImgKey] = useState(0)
    const { auth, setAuth } = useAuth()

    const handleCancel = () => {
        setAvatarInput(null)
        setImgKey(Date.now())
        setIsShowMenu(false)
    }

    const HEADERS = {
        headers: {
            "Content-Type": "multipart/form-data",
            withCredentials: true,
            credentials: "include",
            Authorization: `Bearer ${auth.accessToken}`
        }
    }

    const HEADERS_1 = {
        headers: {
            "Content-Type": "application/json",
            withCredentials: true,
            credentials: "include",
            Authorization: `Bearer ${auth.accessToken}`
        }
    }

    const submitChangeAvatar = () => {
        const formData = new FormData()
        const postItem = {
            userID: auth.id, text: `${auth.name} updated avatar`, time: Date.now(),
            name: auth.name, likes: [], comments: [], shares: []
        }

        if (avatarInput) formData.append("photo", avatarInput, avatarInput.name)
        formData.append("postItem", JSON.stringify(postItem))

        const addNewPost = async () => {
            try {
                const res = await axios.post(CHANGE_AVATAR, formData, HEADERS)

                if (res?.data?.ok) {
                    setAuth(prev => ({ ...prev, avatar: res.data.avatar }))
                    setUser(prev => ({ ...prev, avatar: res.data.avatar }))
                    setPosts(prev => prev.map(item => ({ ...item, avatar: res.data.avatar })))
                    handleCancel()
                } else {
                    console.log("added new post failed")
                }
            } catch (error) {
                console.log(error)
            }
        }
        addNewPost()
    }

    const handleRemoveAvatar = () => {
        const postItem = {
            postItem: {
                userID: auth.id, text: `${auth.name} removed avatar`, time: Date.now(),
                name: auth.name, likes: [], comments: [], shares: []
            }
        }

        const addNewPost = async () => {
            try {
                const res = await axios.post(REMOVE_AVATAR, JSON.stringify(postItem), HEADERS_1)

                if (res?.data?.ok) {
                    setAuth(prev => ({ ...prev, avatar: NO_AVATAR }))
                    setUser(prev => ({ ...prev, avatar: NO_AVATAR }))
                    setPosts(prev => prev.map(item => ({ ...item, avatar: NO_AVATAR })))
                    handleCancel()
                } else {
                    console.log("added new post failed")
                }
            } catch (error) {
                console.log(error)
            }
        }
        addNewPost()
    }

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth))
    }, [auth])

    const avatarMenuRef = useRef()

    useEffect(() => {
        if (isShowMenu) {
            const listener = (e) => {
                if (!avatarMenuRef.current.contains(e.target)) {
                    setIsShowMenu(false)
                }
            }
            setTimeout(() => document.addEventListener("click", listener), 1);

            return () => document.removeEventListener("click", listener)
        }
    }, [isShowMenu])


    return (<>
        <div className="Profile__avatar" onClick={() => setIsShowMenu(prev => !prev)}>
            {!avatarInput && <div className="avatarContainer"><img src={user.avatar} alt="" /></div>}
            {avatarInput && <div className="avatarContainer"><img src={URL.createObjectURL(avatarInput)} /></div>}

            {
                isShowMenu && !avatarInput && user.email === auth.email &&
                <div className="Avatar__menu" ref={avatarMenuRef}>
                    {auth.avatar && <button onClick={() => handleRemoveAvatar()}><i className="fa fa-trash"></i>Remove avatar</button>}
                    <label htmlFor='avatarInput' onClick={(e) => { e.stopPropagation(); }}><i className="fa fa-camera"></i> Change avatar</label>
                </div>
            }


            {
                avatarInput && user.email === auth.email &&
                <div className="confirmMenu">
                    <button onClick={() => handleCancel()}>Discard change avatar</button>
                    <button onClick={() => submitChangeAvatar()}>Save change avatar</button>
                </div>
            }
        </div>

        <input type="file" id="avatarInput" key={imgKey} onChange={(e) => setAvatarInput(e.target.files[0])} />

    </>
    )
}

export default ProfileAvatar