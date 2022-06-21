import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'

import useAuth from "../../../Auth/useAuth"

import PostActions from "../../../components/Post/PostMIDDLE/PostActions"
import RowItem from "../../../components/RowItem/RowItem"
import PostInfo from "./PostInfo"
import Dots from '../../../components/Dots/Dots'
import PostComment from "../../../components/Post/PostComment/PostComment"
import ReactStats from "../../../components/Post/ReactStats/ReactStats"
// import PostOption from "./PostOption"

const DELETE_API = "http://localhost:9999/api/post/delete/"
const LIKE_API = "http://localhost:9999/api/post/like"


function PostContent({ post, setPost }) {
    const { auth } = useAuth()
    const navigate = useNavigate()

    const AXIOS_OPTION = {
        headers:
        {
            withCredentials: true,
            credentials: 'include',
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json"
        }
    }

    const deletePost = async (id) => {
        try {
            const url = DELETE_API + id
            const response = await axios.post(
                url,
                JSON.stringify({ hello: "hihi" }),
                AXIOS_OPTION
            )

            if (response.data.ok) {
                alert("Deleted")
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="PostContent">

            {/* post top  */}
            <div className="PostContent__top">
                <PostInfo post={post} />
                {auth.email === post.email &&
                    <Dots left >
                        <div className="Post_options">
                            <RowItem
                                leftIcon={<i className="fa fa-trash" />}
                                text="Delete post"
                                onClick={() => deletePost(post.id)}
                            />
                        </div>
                    </Dots>
                }
            </div>

            {/* post text  */}
            {post.text &&
                <div className="PostContent__text">
                    <p>{post.text}</p>
                </div>
            }

            {(post.likes.length > 0 || post.comments.length > 0) && <ReactStats post={post} />}
            <PostActions setPost={setPost} post={post} />
            <PostComment setPost={setPost} post={post} />
            {/* <PostOption /> */}
        </div>
    )
}

export default PostContent