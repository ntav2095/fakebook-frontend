import axios from 'axios'
import { useState } from 'react'

import useAuth from '../../../Auth/useAuth'

import RowItem from '../../Common/RowItem/RowItem'
import Avatar from '../../Common/Avatar/Avatar'

import './PostBOTTOM.scss'


const COMMENT_API = "http://localhost:9999/api/post/comment"


function PostBOTTOM({ post, setPost, isShowCmt }) {
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
                setPost(prev => ({ ...prev, comments: [...prev.comments, cmtItem] }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const COMMENTS_CLASS = isShowCmt ? "comments active" : "comments"

    return (<>
        {isShowCmt &&
            <>
                <div className={COMMENTS_CLASS}>
                    {post.comments.length > 0 &&
                        <>
                            {post.comments.map((item, index) =>
                                <RowItem key={index} image={item.avatar} text={item.text} borderRadius="50%" />
                            )}
                        </>
                    }
                </div>


                <form className="commentCreator" onSubmit={handleComments}>
                    <label>
                        <Avatar size="30px" image={post.avatar} />

                        <div className="commentCreator__input" >
                            <input type="text" placeholder='Write a comment...' value={cmtInput} onChange={(e) => setCmtInput(e.target.value)} />
                        </div>
                    </label>
                </form>

            </>
        }

    </>)
}

export default PostBOTTOM