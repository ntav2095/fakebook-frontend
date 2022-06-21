import { useState, useEffect } from 'react'



import './ReactStats.scss'

function ReactStats({ post }) {
    const [postLikes, setPostLikes] = useState([])
    const [postComments, setPostComments] = useState(0)

    useEffect(() => {
        setPostLikes(post.likes)
    }, [post.likes])

    useEffect(() => {
        setPostComments(post.comments.length)
    }, [post.comments])

    return (
        <>
            {(postLikes.length > 0 || postComments > 0) &&
                <div className="ReactStats">
                    <div className="ReactStats__likes">
                        {
                            postLikes.length > 0 &&
                            <div className="Post__likeQty__icon">
                                <i className="fa fa-thumbs-up" />

                                {postLikes.length > 0 &&
                                    <div className="likedInfo">
                                        <h6>Like</h6>
                                        {postLikes.map((item, index) => <p key={index}>{item.name}</p>)}
                                    </div>}
                            </div>
                        }

                        {postLikes.length === 1 && <span>{postLikes[0].name}</span>}
                        {postLikes.length > 1 && <span>{postLikes.length + " likes"}</span>}

                    </div>

                    <div className="ReactStats__likes">
                        {postComments === 1 && <span>1 comment</span>}
                        {postComments > 1 && <span>{postComments} comments</span>}
                    </div>
                </div>}
        </>
    )
}

export default ReactStats