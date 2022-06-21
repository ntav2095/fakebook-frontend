import { useRef } from 'react'
import * as Scroll from 'react-scroll'

import useAuth from '../../Auth/useAuth'

import PostCreator from './PostCreator/PostCreator'
import PostList from './PostList/PostList'
import Post from '../../components/Post/Post'

import './Timeline.scss'
import { useEffect, useState } from 'react'

function Timeline({ posts, setPosts, email, loading, error, setLoadMore }) {
    const timelineRef = useRef()
    const { auth } = useAuth()
    const [oldScrollTop, setOldScrollTop] = useState(0)
    useEffect(() => {
        const e = timelineRef.current
        let isUnder = false
        const scrollListener = () => {
            const x = 0.9 * (e.scrollHeight - e.clientHeight)
            if (e.scrollTop > 0.9 * (e.scrollHeight - e.clientHeight) && !isUnder) {
                isUnder = true
                setOldScrollTop(0.9 * (e.scrollHeight - e.clientHeight))
                setLoadMore(prev => !prev)
                // e.scrollTop = 0.95 * (e.scrollHeight - e.clientHeight)
            }

            if (e.scrollTop < 0.9 * (e.scrollHeight - e.clientHeight) && isUnder) {
                isUnder = false
            }
        }

        e.addEventListener("scroll", scrollListener)

        return () => e.removeEventListener("scroll", scrollListener)
    }, [])

    useEffect(() => {
        if (timelineRef.current) timelineRef.current.scrollTop = oldScrollTop
    }, [posts])

    return (
        <div className="Timeline__container" ref={timelineRef}>
            <div className="Timeline">
                {email === auth.email && <PostCreator setPosts={setPosts} />}
                {!email && <PostCreator setPosts={setPosts} />}
                {loading && <h1>Loading...</h1>}
                {posts && <PostList setPosts={setPosts} posts={posts} />}

            </div>
        </div>

    )
}

export default Timeline