import { createContext, useState } from "react";

export const PostsContext = createContext()

const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([])

    return (
        <PostsContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostsContext.Provider>
    )
}

export default PostsProvider