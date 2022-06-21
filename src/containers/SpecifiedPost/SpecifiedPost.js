import { useParams } from 'react-router-dom'

import { useNormalAxios } from '../../hooks/useAxios'
import axiosInstance from '../../APIs/APIs'
import useAuth from '../../Auth/useAuth'

import PostPhoto from './PostPhoto/PostPhoto'
import PostContent from './PostContent/PostContent'

import './SpecifiedPost.scss'

function SpecifiedPost() {
    const { pid } = useParams()
    const { auth } = useAuth()

    const [loading, error, post, setPost, success] = useNormalAxios({
        axiosInstance,
        url: `post/get-one/${pid}`,
        method: "get",
        requestConfig: {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`
            }
        }
    })

    return (
        <div className="SpecifiedPost">
            {post && <>
                <div className="SpecifiedPost__left">
                    <PostPhoto post={post} />
                </div>

                <div className="SpecifiedPost__right">
                    <PostContent setPost={setPost} post={post} />
                </div>
            </>}
        </div>
    )
}

export default SpecifiedPost