import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'


import useAuth from '../../Auth/useAuth'
import PostTOP from './PostTOP/PostTOP'
import PostMIDDLE from './PostMIDDLE/PostMIDDLE'
import PostBOTTOM from './PostBOTTOM/PostBOTTOM'

import './PostShow.scss'

const POST_API = `${process.env.REACT_APP_API_URL}/post/get-one/`


function PostShow() {
    const { pid } = useParams()
    const [post, setPost] = useState(null)
    const [isShowCmt, setIsShowCmt] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const { auth } = useAuth()

    const AXIOS_OPTION = {
        headers:
        {
            withCredentials: true,
            credentials: 'include',
            Authorization: `Bearer ${auth.accessToken}`
        }
    }

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(POST_API + pid, AXIOS_OPTION)
                if (res.data.ok) {
                    console.log(res.data.post)
                    setPost(res.data.post)
                }
            } catch (error) {
                if (error.response?.status === 404) {
                    setNotFound(true)
                } else {
                    console.log(error)
                }
            }
        }

        getPost()

    }, [pid])

    return (<>
        {
            !notFound && post ?
                <div className="PostShow">
                    <div className="PostShow__post">
                        <PostTOP post={post} setPost={setPost} setDeleted={setDeleted} />
                        <PostMIDDLE post={post} setPost={setPost} isShowCmt={isShowCmt} setIsShowCmt={setIsShowCmt} />
                        <PostBOTTOM post={post} setPost={setPost} isShowCmt={isShowCmt} />
                    </div>
                </div>
                : deleted ? <><h1>Deleted successfully</h1><Link to="/">Go to Home</Link>  <Link to={`/${auth.email}`}>Go to profile page</Link></>
                    : <h1>Not Found</h1>
        }
    </>)
}

export default PostShow