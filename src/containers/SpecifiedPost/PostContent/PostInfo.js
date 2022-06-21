import { Link } from 'react-router-dom'
import { format as dateFormat } from 'date-fns'

import Avatar from '../../../components/Avatar/Avatar'

function PostInfo({ post }) {
    return (
        <Link to={`/${post.email}`} className="Post__header__left">
            <Avatar size="40px" image={post.avatar} />
            <div className="Post__info">
                <h4>{post.name}</h4>
                {post.time && <p>{dateFormat(+post.time, "dd MMMM yyyy")}</p>}
            </div>
        </Link>
    )
}

export default PostInfo