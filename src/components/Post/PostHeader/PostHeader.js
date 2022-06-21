import { format as dateFormat } from 'date-fns'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import useAuth from '../../../Auth/useAuth'
import axiosInstance from '../../../APIs/APIs'
import { useNormalAxios } from '../../../hooks/useAxios'

import RowItem from '../../RowItem/RowItem'
import Dots from '../../Dots/Dots'
import PostInfo from './PostInfo'

import './PostHeader.scss'

const DELETE_API = "http://localhost:9999/api/post/delete/"

function PostHeader({ post, setPosts }) {
    const { auth } = useAuth()
    const navigate = useNavigate()
    const AXIOS_OPTION = {
        headers:
        {
            withCredentials: true,
            credentials: 'include',
            Authorization: `Bearer ${auth.accessToken}`
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
                if (setPosts) setPosts(prev => prev.filter(item => item.id !== id))
                if (!setPosts) navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (<>
        <div className="Post__header">
            <PostInfo post={post} />

            {auth.email === post.email &&
                <Dots key={post.id} >
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

        <div className="Post__text">
            <p>{post.text}</p>
        </div>

        {post.photo && <Link to={`/post/${post.id}`} className="Post__photos"><img src={post.photo} alt="" /></Link>}

    </>)
}

export default PostHeader