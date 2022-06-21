import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';

import useAuth from "../../../Auth/useAuth"

import Avatar from '../../../components/Avatar/Avatar'

function HeaderRightUserInfo() {
    const { auth } = useAuth();
    const { email } = useParams()
    return (
        <Link to={`/${auth.email}`} className={`Header__userInfo ${email === auth.email ? "active" : ""}`}>
            <Avatar image={auth.avatar} size="35px" />
            <p>{auth.name}</p>
        </Link>
    )
}

export default HeaderRightUserInfo