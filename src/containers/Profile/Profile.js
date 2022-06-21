import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import useAuth from '../../Auth/useAuth'
import { useAccumulatedAxios, useNormalAxios } from '../../hooks/useAxios'
import axiosInstance from '../../APIs/APIs'

import Avatar from '../../components/Avatar/Avatar'
import Timeline from '../../components/Timeline/Timeline'
import CoverPhoto from './CoverPhoto/CoverPhoto'
import ProfileAvatar from './ProfileAvatar/ProfileAvatar'
import About from './About/About'
import Notfound from '../Notfound/Notfound'
import ProfileTop from './ProfileTop'

import './Profile.scss'

function Profile() {
    const [oldScrollTop, setOldScrollTop] = useState(0)
    const { email } = useParams()
    const url = `/post/user/${email}/`

    const profileRef = useRef()
    const { auth } = useAuth()
    const [posts, setPosts, error, loading, setLoadMore] = useAccumulatedAxios({ axiosInstance, method: "get", url: url, requestConfig: { headers: { Authorization: `Bearer ${auth.accessToken}` } } })

    const [userLoading, userError, userData, setUserData, userSuccess] = useNormalAxios({
        axiosInstance,
        url: `user/get-user/${email}`,
        method: 'get',
        requestConfig: {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`
            }
        }
    })

    useEffect(() => {
        let isUnder = false
        const scrollListener = () => {
            console.log("from Profile")
            if (!isUnder && profileRef.current.scrollTop > (profileRef.current.scrollHeight - profileRef.current.clientHeight) * 0.9) {
                isUnder = true
                setOldScrollTop((profileRef.current.scrollHeight - profileRef.current.clientHeight) * 0.9)
                setLoadMore(prev => !prev)
            }

            if (profileRef.current.scrollTop < (profileRef.current.scrollHeight - profileRef.current.clientHeight) * 0.9 && isUnder) {
                isUnder = false
            }
        }
        profileRef.current.addEventListener("scroll", scrollListener)

    }, [])

    useEffect(() => {
        if (profileRef.current) profileRef.current.scrollTop = oldScrollTop
    }, [posts])


    return (<>
        {
            <div className="Profile" ref={profileRef}>
                {userLoading && <h1>Loading user info...</h1>}
                {userError && <h1>{userError}</h1>}
                {!userLoading && !userError && userData &&
                    <ProfileTop
                        user={userData}
                        setUser={setUserData}
                        setPosts={setPosts}
                    />
                }
                {console.log(userData)}
                <div className="Profile__bottom" >
                    {userData && <About user={userData} />}
                    <Timeline
                        posts={posts}
                        setPosts={setPosts}
                        error={error}
                        loading={loading}
                        setLoadMore={setLoadMore}
                        email={email}
                    />
                </div>
            </div>
        }

        {
            // notFound && <Notfound />
        }

    </>

    )
}

export default Profile