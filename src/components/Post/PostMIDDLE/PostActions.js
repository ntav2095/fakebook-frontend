import axios from 'axios'
import { useState, useEffect } from 'react'

import useAuth from '../../../Auth/useAuth'


const LIKE_API = "http://localhost:9999/api/post/like"

function PostActions({ post, setPosts, setPost }) {
    const [like, setLike] = useState(false)
    const { auth } = useAuth()


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
            const type = post.likes.map(item => item.userID).includes(auth.id) ? "unlike" : "like"
            const likeItem = { postID: post.id, type: type, time: Date.now() }
            const response = await axios.post(LIKE_API, JSON.stringify(likeItem), AXIOS_OPTION)

            if (response.data.ok) {
                type === 'like' ? setLike(true) : setLike(false)
                post.likes = response.data.data
                if (setPost) setPost(prev => ({ ...prev, likes: response.data.data }))
                if (setPosts) setPosts(prev => prev.map(item => item.id === post.id ? post : item))
            } else {
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickComment = () => {
        setPosts(prev => {
            return prev.map(item => {
                if (item.id === post.id) {
                    item.showComment = !item.showComment
                }

                return item
            })
        })
    }

    useEffect(() => {
        post.likes.map(item => item.userID).includes(auth.id) ? setLike(true) : setLike(false)
    }, [post])
    const LIKE_CLASS = like ? "like active" : "like"
    const COMMENT_CLASS = post.showComment ? "comment active" : "comment"
    return (
        <div className="PostActions">

            <div onClick={() => handleLike()} className={LIKE_CLASS}>
                <i className="fa fa-thumbs-up" />
                <p>Like</p>
            </div>

            <div className={COMMENT_CLASS} onClick={() => {
                if (setPosts) handleClickComment()
            }}>
                <i className="fa fa-comment-alt"></i>
                <p>Comment</p>
            </div>

            <div className="share">
                <i className="fa fa-share"></i>
                <p>Share</p>
            </div>

        </div>
    )
}

export default PostActions