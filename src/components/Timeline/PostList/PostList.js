import './PostList.scss'
import Post from '../../Post/Post'


function PostList({ setPosts, posts }) {

    return (
        <div className="PostList">
            {
                posts?.length
                    ? posts.length && posts.map((post, index) => <Post setPosts={setPosts} key={index} post={post} />)
                    : <h1>No post available</h1>
            }
        </div>
    )
}

export default PostList