import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

import useAuth from '../../../../Auth/useAuth'

import Avatar from '../../../Avatar/Avatar'

import './PostLightBox.scss'


function PostLightBox({ setShowLightBox, setPosts }) {
    const { auth } = useAuth()
    const [textInput, setTextInput] = useState('')
    const [showImgInput, setShowImgInput] = useState(false)
    const [imgInput, setImgInput] = useState(null)
    const [imgInputKey, setImgInputKey] = useState('')

    const postLightBoxRef = useRef()
    const closeImgInput = () => {
        setShowImgInput(false);
        setImgInput(null);
    }

    const closeLightBox = () => {
        setImgInput(null);
        setTextInput("")
        setShowImgInput(false);
        setShowLightBox(false)
        setImgInputKey(Date.now() * Math.random())
    }

    useEffect(() => {

        const clickOutsideListener = (e) => {
            console.log(e.target)

            if (postLightBoxRef.current && !postLightBoxRef.current.contains(e.target)) {
                closeLightBox()
            }
        }

        if (postLightBoxRef.current) {
            document.addEventListener("mouseup", clickOutsideListener)
        }

        return () => document.removeEventListener("mouseup", clickOutsideListener)
    }, [])


    const sendNewPost = (e) => {
        e.preventDefault()
        const formData = new FormData()
        const postItem = {
            userID: auth.id, text: textInput, time: Date.now(),
            avatar: auth.avatar, name: auth.name, likes: [], comments: [], shares: []
        }

        if (imgInput) formData.append("photo", imgInput, imgInput.name)
        formData.append("postItem", JSON.stringify(postItem))


        const addNewPost = async () => {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/post/add`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            withCredentials: true,
                            credentials: 'include',
                            Authorization: `Bearer ${auth.accessToken}`
                        }
                    }
                )

                if (response?.data?.ok) {
                    const newPostID = response.data.newPostID
                    const photo = response.data.photo
                    closeLightBox()

                    setPosts(prev => [...prev, { ...postItem, id: newPostID, photo: photo, email: auth.email }])
                } else {
                    console.log("added new post failed")
                }
            } catch (error) {
                console.log(error)
            }
        }
        addNewPost()
    }

    return (
        <div className="PostLightBox">
            <div ref={postLightBoxRef} className="PostLightBox__main">
                <h6 className="PostLightBox__header">Create Post</h6>

                <div className="PostLightBox__userInfo">
                    <Link to={`/${auth.email}`}><Avatar size="40px" image={auth.avatar} /></Link>
                    <p>{auth.name}</p>
                </div>

                <p
                    className="PostLightBox__closeBtn"
                    onClick={closeLightBox}
                >
                    <i className="fa fa-times"></i>
                </p>

                <div className="PostLightBox__textInput" >
                    <textarea
                        placeholder={`What's on your mind, ${auth.name}`}
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                    />
                </div>



                {
                    showImgInput &&
                    <div className="PostLightBox__imgInput">

                        <label htmlFor="imgPostCreator">
                            {
                                !imgInput &&
                                <div className="imgPlaceholder">
                                    <i className="fa fa-image"></i>
                                    <p>Add photo</p>
                                    <span>or drag and drop</span>
                                </div>
                            }
                            {imgInput && <img src={URL.createObjectURL(imgInput)} alt="" />}

                        </label>

                        <p className="imgCloseBtn" onClick={closeImgInput}>
                            <i className="fa fa-times"></i>
                        </p>

                        <input
                            id="imgPostCreator"
                            type="file"
                            onChange={(e) => setImgInput(e.target.files[0])}
                            key={imgInputKey}
                        />

                        <img src={imgInput} alt="" />
                        {console.log(imgInput)}
                    </div>
                }



                <div className="PostLightBox__options">
                    <p>Add to your post</p>

                    <ul>
                        <li onClick={() => setShowImgInput(true)}><i style={{ color: "green" }} className="fa fa-image"></i></li>
                        <li><i style={{ color: "blue" }} className="fa fa-user-plus"></i></li>
                        <li><i style={{ color: "orange" }} className="fa fa-smile"></i></li>
                        <li><i style={{ color: "red" }} className="fa fa-map-marker"></i></li>
                        <li><i style={{ color: "violet" }} className="fa fa-microphone"></i></li>
                    </ul>
                </div>

                <p className="submitBtn" onClick={sendNewPost}>Post</p>

            </div >
        </div >
    )
}

export default PostLightBox