
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



import useAuth from '../../../Auth/useAuth'

import PostLightBox from './PostLightBox/PostLightBox'
import Avatar from '../../Avatar/Avatar'

import './PostCreator.scss'


function PostCreator({ setPosts }) {
    const [text, setText] = useState('')
    const [photo, setPhoto] = useState('')
    const [inputKey, setInputKey] = useState('')
    const { auth } = useAuth()
    const [showLightBox, setShowLightBox] = useState(false)



    return (
        <div className="PostCreator boxShadow">

            <Link to={`/${auth.email}`}>
                <Avatar
                    image={auth.avatar}
                    size="40px"
                />
            </Link>

            <div
                className="PostCreator__inputBtn"
                onClick={() => setShowLightBox(true)}
            >
                <p>What's on your mind, {auth.name}?</p>
            </div>

            {
                showLightBox &&
                <PostLightBox setPosts={setPosts} setShowLightBox={setShowLightBox} />

            }
        </div>
    )
}

export default PostCreator