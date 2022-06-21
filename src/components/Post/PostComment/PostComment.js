import { useState, useEffect } from 'react'



import CommentCreator from './CommentCreator'
import Comments from './Comments'

import './PostComment.scss'

function PostComment({ post, setPosts, setPost }) {
    const [showComments, setShowComments] = useState(false)

    useEffect(() => {
        if (setPosts) {
            (post.showComment) ? setShowComments(true) : setShowComments(false)
        } else {
            setShowComments(true)
        }
        console.log("useEffect showcomments")
    }, [post.showComment])
    return (<div className="PostComment">
        {showComments && <>
            <Comments post={post} />
            <CommentCreator setPost={setPost} setPosts={setPosts} post={post} />
        </>}
    </div>)
}

export default PostComment