import { useState, useEffect } from 'react'
import axios from 'axios'

import useAuth from '../../../Auth/useAuth'

import ReactStats from './ReactStats/ReactStats'

import './PostMIDDLE.scss'

const LIKE_API = `${process.env.REACT_APP_API_URL}/post/like`

function PostMIDDLE({ post, setIsShowCmt, isShowCmt }) {
    const { auth } = useAuth()
    const [liked, setLiked] = useState(post.likes.map(like => like.userID).includes(auth.id))

    const AXIOS_OPTION = {
        headers: {
            withCredentials: true,
            credentials: 'include',
            Authorization: `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json'
        }
    }

    const handleLike = async () => {
        try {
            const likeItem = { postID: post.id, type: liked ? "unlike" : "like", time: Date.now() }
            const response = await axios.post(LIKE_API, JSON.stringify(likeItem), AXIOS_OPTION)

            if (response.data.ok) {
                const newLikes = !liked
                    ? [...post.likes, { userID: auth.id, name: auth.name }]
                    : post.likes.filter(item => item.userID !== auth.id)

                post.likes = newLikes
                setLiked(!liked)
            } else {
                alert("something wrong happened")
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const LIKE_CLASS = liked ? "like active" : "like"
    const COMMENT_CLASS = isShowCmt ? "comment active" : "comment"
    return (
        <>
            <ReactStats likes={post.likes} />

            <div className="Post__likes">

                <div onClick={handleLike} className={LIKE_CLASS}>
                    <i className="fa fa-thumbs-up" />
                    <p>Like</p>
                </div>

                <div className={COMMENT_CLASS} onClick={() => setIsShowCmt(prev => !prev)}>
                    <i className="fa fa-comment-alt"></i>
                    <p>Comment</p>
                </div>

                <div className="share">
                    <i className="fa fa-share"></i>
                    <p>Share</p>
                </div>

            </div>
        </>
    )
}

export default PostMIDDLE