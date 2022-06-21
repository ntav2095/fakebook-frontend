import PostHeader from './PostHeader/PostHeader'
import PostMIDDLE from './PostMIDDLE/PostMIDDLE'
import PostComment from './PostComment/PostComment'

import './Post.scss'

function Post({ post, setPosts }) {


    return (
        <div className="Post">
            <PostHeader post={post} setPosts={setPosts} />
            <PostMIDDLE post={post} setPosts={setPosts} />
            <PostComment post={post} setPosts={setPosts} />
        </div>
    )
}

export default Post