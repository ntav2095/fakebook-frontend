import { useRef } from 'react'

import useAccumulatedAxios from '../../APIs/apiServices/useAccumulateAxios'
import useAuth from '../../Auth/useAuth'
import axiosInstance from '../../APIs/APIs'

import LeftBar from './LeftBar/LeftBar'
import RightBar from './RightBar/RightBar'
import Timeline from '../../components/Timeline/Timeline'


import './Home.scss'

function Home() {
    const url = "/post/get-all/"

    const homeRef = useRef()
    const { auth } = useAuth()
    const [posts, setPosts, error, loading, setLoadMore] = useAccumulatedAxios({ axiosInstance, method: "get", url: url, requestConfig: { headers: { Authorization: `Bearer ${auth.accessToken}` } } })


    return (
        <div className='Home__container' ref={homeRef}>
            <div className="Home">
                <LeftBar />
                <Timeline
                    posts={posts}
                    setPosts={setPosts}
                    error={error}
                    loading={loading}
                    setLoadMore={setLoadMore}
                />
                <RightBar />
            </div>

        </div>
    )
}

export default Home