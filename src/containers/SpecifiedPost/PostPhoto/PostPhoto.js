




function PostPhoto({ post }) {
    return (
        <div className="PostPhoto">
            <img src={post.photo} alt="" />
            {/* {console.log("from postphoto: ", post)} */}
        </div>
    )
}

export default PostPhoto