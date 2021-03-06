import axios from 'axios'

import useAuth from "../../Auth/useAuth"

import CoverPhoto from "./CoverPhoto/CoverPhoto"
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar"
import Avatar from "../../components/Avatar/Avatar"

function ProfileTop({ user, setUser, setPosts }) {
    const { auth, setAuth } = useAuth();

    const handleFriendRequest = async (type) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/user/friend-request`,
                JSON.stringify({ authEmail: auth.email, recEmail: user.email, type: type }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        withCredentials: true,
                        credentials: "include",
                        Authorization: `Bearer ${auth.accessToken}`
                    }
                }
            )

            if (response.data.ok) {
                console.log(response.data)
                setAuth(prev => ({ ...prev, friendRequest: response.data.authFriendRequest, friends: response.data.authFriends }))
                setUser(prev => ({ ...prev, friendRequest: response.data.recFriendRequest, friends: response.data.recFriends }))
                localStorage.setItem('auth', JSON.stringify(auth))
            } else {
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="Profile__top">
            <CoverPhoto user={user} setUser={setUser} />

            <div className="Profile__userInfo">
                <ProfileAvatar user={user} setUser={setUser} setPosts={setPosts} />

                <div className="Profile__userInfo__text">
                    <div className="Profile__userInfo__text__left">
                        <h1>{user.name}</h1>
                        <p>{user.friends.length} friends</p>
                        <div>
                            <Avatar image="asset/avatar.webp" size="30px" />
                        </div>
                    </div>

                    {/* handle friend btns  */}
                    {/* auth friends: avatar, email, name  */}
                    {/* friend request email, name, avatar */}
                    <div className="Profile__userInfo__text__friendBtns">
                        {auth.email !== user.email && <>

                            {
                                auth.friendRequest.map(item => item.email).includes(user.email) &&
                                <>
                                    <button onClick={() => handleFriendRequest("tuchoi")}>T??? ch???i</button>
                                    <button onClick={() => handleFriendRequest("dongy")}>?????ng ??</button>
                                </>
                            }

                            {
                                user.friendRequest.map(item => item.email).includes(auth.email) &&
                                <button onClick={() => handleFriendRequest("huygui")}>H???y g???i k???t b???n</button>
                            }

                            {

                                !user.friendRequest.map(item => item.email).includes(auth.email) &&
                                !auth.friends.map(item => item.email).includes(user.email) &&
                                !auth.friendRequest.map(item => item.email).includes(user.email) &&
                                <button className="addFriendBtn" onClick={() => handleFriendRequest("gui")}>G???i l???i m???i</button>
                            }

                            {auth.friends.map(item => item.email).includes(user.email) && <button onClick={() => handleFriendRequest("huyketban")}>H???y k???t b???n</button>}
                        </>}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ProfileTop