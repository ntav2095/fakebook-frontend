import { useState, useEffect, useRef } from 'react'

import axios from 'axios'

import useAuth from '../../../Auth/useAuth'

import RowItem from '../../../components/RowItem/RowItem'

import './CoverPhoto.scss'

const CHANGE_COVER_PHOTO_API = "http://localhost:9999/api/user/change-cover-photo"
const REMOVE_COVER_PHOTO_API = "http://localhost:9999/api/user/remove-cover-photo"

function CoverPhoto({ user, setUser }) {
    const [isShowMenu, setIsShowMenu] = useState(false)
    const [imgInput, setImgInput] = useState(null)
    const [imgKey, setImgKey] = useState(0)
    const coverPhotoRef = useRef()
    const { auth, setAuth } = useAuth()

    const handleCancel = () => {
        setImgInput(null)
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

    const submitChangePhoto = () => {
        const formData = new FormData()
        const postItem = {
            userID: auth.id, text: `${auth.name} updated cover photo`, time: Date.now(),
            avatar: auth.avatar, name: auth.name, likes: [], comments: [], shares: []
        }

        if (imgInput) formData.append("photo", imgInput, imgInput.name)
        formData.append("postItem", JSON.stringify(postItem))

        const addNewPost = async () => {
            try {
                const res = await axios.post(CHANGE_COVER_PHOTO_API, formData, HEADERS)

                if (res?.data?.ok) {
                    setAuth(prev => ({ ...prev, coverPhoto: res.data.coverPhoto }))
                    setUser(prev => ({ ...prev, coverPhoto: res.data.coverPhoto }))
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

    const handleRemoveCoverPhoto = () => {
        console.log("handleRemoveCoverPhoto")
        const postItem = {
            postItem: {
                userID: auth.id, text: `${auth.name} removed cover photo`, time: Date.now(),
                avatar: auth.avatar, name: auth.name, likes: [], comments: [], shares: []
            }
        }

        const addNewPost = async () => {
            try {
                const res = await axios.post(REMOVE_COVER_PHOTO_API, JSON.stringify(postItem), HEADERS_1)

                if (res?.data?.ok) {
                    setAuth(prev => ({ ...prev, coverPhoto: "" }))
                    setUser(prev => ({ ...prev, coverPhoto: "" }))
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
    const coverBtnRef = useRef()


    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth))
    }, [auth])

    useEffect(() => {
        const closeCoverPhotoMenu = (e) => {
            if (coverPhotoRef.current && !coverPhotoRef.current.contains(e.target) && isShowMenu && !coverBtnRef.current.contains(e.target)) setIsShowMenu(false)
        }

        if (isShowMenu) document.addEventListener("click", closeCoverPhotoMenu)

        return () => document.removeEventListener("click", closeCoverPhotoMenu)
    }, [isShowMenu])

    return (
        <div className="CoverPhoto">
            {user.coverPhoto && !imgInput && <img src={user.coverPhoto} alt="" />}
            {imgInput && <img src={URL.createObjectURL(imgInput)} />}


            {imgInput &&
                <div className="verifyChangePhoto">
                    <button onClick={() => handleCancel()}>Cancel</button>
                    <button onClick={() => submitChangePhoto()}>Save</button>
                </div>
            }

            {user.email === auth.email &&
                <div
                    ref={coverBtnRef}
                    onClick={() => setIsShowMenu(prev => !prev)}
                    className="CoverPhoto__btn"
                >
                    <i className="fa fa-camera"></i>
                    <span>  Add cover photo</span>

                    {isShowMenu &&
                        <ul ref={coverPhotoRef} className="CoverPhoto__menu">
                            <li><i className="fa fa-images"></i> <span>Select photo</span></li>
                            <li onClick={(e) => e.stopPropagation()}><label htmlFor="coverPhotoInput"><i className="fa fa-upload"></i> <span>Upload photo</span></label></li>
                            {user.coverPhoto && <li onClick={(e) => { e.stopPropagation(); handleRemoveCoverPhoto(); }}><i className="fa fa-trash-alt"></i><span>Remove photo</span></li>}
                        </ul>
                    }
                </div>
            }

            <input key={imgKey} id="coverPhotoInput" type="file" onChange={(e) => setImgInput(e.target.files[0])} />
        </div>
    )
}

export default CoverPhoto