import { format as dateFormat } from 'date-fns'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import useAuth from '../../../Auth/useAuth'

import Avatar from '../../Common/Avatar/Avatar'
import RowItem from '../../Common/RowItem/RowItem'

import './PostTOP.scss'

function PostTOP({ post, setDeleted, setPost }) {
    const [showOptions, setShowOptions] = useState(false)

    const { auth } = useAuth()
    const optionsBtnRef = useRef()
    const postOptionsRef = useRef()

    const AXIOS_OPTION = {
        headers:
        {
            withCredentials: true,
            credentials: 'include',
            Authorization: `Bearer ${auth.accessToken}`
        }
    }

    const deletePost = async (id) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/post/delete/${id}`,
                JSON.stringify({ hello: "hihi" }),
                AXIOS_OPTION
            )

            if (response.data.ok) {
                setDeleted(true)
                setPost(null)
            } else {
                console.log(response)
                console.log("delete that bai")

            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        document.addEventListener("click", (e) => {
            if (postOptionsRef.current) {
                console.log(postOptionsRef.current)
                if (!postOptionsRef.current.contains(e.target) && !optionsBtnRef.current.contains(e.target)) setShowOptions(false)
            }
        })
    }, [])


    return (
        <>

            <div className="Post__header">
                <Link to={`/${post.email}`} className="Post__header__left">
                    <Avatar size="40px" image={post.avatar} />
                    <div className="Post__info">
                        <h4>{post.name}</h4>
                        <p>{dateFormat(+post.time, "dd MMMM yyyy")}</p>
                    </div>
                </Link>

                {
                    auth.email === post.email &&
                    <div ref={optionsBtnRef} onClick={() => setShowOptions(!showOptions)} className={`Post_options__btn ${showOptions ? "active" : ""}`}>
                        <span></span>
                        <span></span>
                        <span></span>

                        {
                            showOptions &&
                            <div ref={postOptionsRef} className="Post_options">
                                <RowItem
                                    leftIcon={<i className="fa fa-trash" />}
                                    text="Delete post"
                                    onClick={() => deletePost(post.id)}
                                />
                            </div>
                        }
                    </div>
                }

            </div>

            <div className="Post__text">
                <p>{post.text}</p>
            </div>

            {post.photo && <Link to={`/post/${post.id}`} className="Post__photos"><img src={post.photo} alt="" /></Link>}
        </>
    )
}

export default PostTOP