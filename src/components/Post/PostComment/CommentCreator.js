import { useState, useEffect } from 'react'
import axios from 'axios'

import useAuth from "../../../Auth/useAuth"

import Avatar from '../../Avatar/Avatar'

const COMMENT_API = `${process.env.REACT_APP_API_URL}/post/comment`

function CommentCreator({ post, setPosts, setPost }) {
    const [cmtInput, setCmtInput] = useState('')
    const { auth } = useAuth()

    const AXIOS_OPTION = {
        headers: {
            withCredentials: true,
            credentials: 'include',
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json"
        }
    }

    const handleComments = async (e) => {
        e.preventDefault()
        try {
            const cmtItem = {
                postID: post.id,
                userID: auth.id,
                text: cmtInput,
                time: Date.now(),
                avatar: auth.avatar
            }

            const response = await axios.post(COMMENT_API, JSON.stringify(cmtItem), AXIOS_OPTION)

            if (response.data.ok) {
                setCmtInput('')
                if (setPosts) setPosts(prev => prev.map(item => (item.id === post.id) ? ({ ...item, comments: [...item.comments, cmtItem] }) : item))
                if (setPost) setPost(prev => ({ ...prev, comments: [...prev.comments, cmtItem] }))
            } else {
                alert("loi")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="CommentCreator">
            <form className="commentCreator" onSubmit={handleComments}>
                <label>
                    <Avatar size="30px" image={post.avatar} />

                    <div className="commentCreator__input" >
                        <input type="text" placeholder='Write a comment...' value={cmtInput} onChange={(e) => setCmtInput(e.target.value)} />
                    </div>
                </label>
            </form>
        </div>
    )
}

export default CommentCreator