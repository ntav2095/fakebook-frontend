import { useState, useEffect } from 'react'


import ReactStats from '../ReactStats/ReactStats'
import PostActions from './PostActions'

import './PostMIDDLE.scss'


function PostMIDDLE({ post, setPosts }) {

    return (
        <>
            <ReactStats post={post} />
            <PostActions post={post} setPosts={setPosts} />
        </>
    )
}

export default PostMIDDLE