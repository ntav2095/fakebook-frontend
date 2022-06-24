import { useState, useEffect } from 'react'
import axios from 'axios'

import useChat from '../../../Context/useChat'
import useAuth from '../../../Auth/useAuth'

import Avatar from '../../Avatar/Avatar'
import RowItem from '../../RowItem/RowItem'

import './ChatBox.scss'


function ChatBox() {
    const { receiver, setReceiver, setShowChat } = useChat()
    const [content, setContent] = useState([])
    const [msgInput, setMsgInput] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const { auth } = useAuth()

    useEffect(() => {
        const getChat = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/chat/get-chat`, JSON.stringify({ receiver: receiver.email }),
                    {

                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`,
                            "Content-Type": "application/json",

                        },
                        withCredentials: true,
                        crossDomain: true


                    })

                if (res.data.ok) {
                    setContent(res.data.chat)
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (receiver) getChat()
    }, [receiver])

    const handleSendMessage = async (e) => {
        e.preventDefault()
        const msgItem = { sender: auth.email, name: auth.name, avatar: auth.avatar, content: msgInput, time: Date.now() }
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/chat/send-message`,
            JSON.stringify({ msgItem: msgItem, receiver: receiver.email }),
            {
                headers: {
                    "Content-Type": "application/json",
                    withCredentials: true,
                    credentials: "include",
                    Authorization: `Bearer ${auth.accessToken}`
                }
            }
        )

        if (res.data.ok) {
            setContent([...content, msgItem])
            setMsgInput('')
        }
    }

    const handleSearch = (e) => {
        console.log("hihi")
        setSearchInput(e.target.value.trim())
        setSearchResult(auth.friends.filter(item => item.email.includes(e.target.value.trim()) || item.name.includes(e.target.value.trim())))
    }

    return (
        <div className="ChatBox boxShadow">
            <div className="ChatBox__top boxShadow">
                <div className="ChatBox__top__left">
                    {receiver && <><Avatar image={receiver.avatar} size="40px" />
                        <p>{receiver.name}</p></>}

                    {
                        !receiver &&
                        <div className="ChatBox__top__input">
                            <span>To: </span><input value={searchInput} onChange={handleSearch} type="text" placeholder='Type a name...' />
                        </div>
                    }
                </div>

                <button className="ChatBox__closeBtn" onClick={() => { setShowChat(false); setReceiver(null) }}><i className="fa fa-times"></i></button>
            </div>

            <ul className="ChatBox__middle">
                {
                    content.length > 0 &&
                    content.map((item, index) => {
                        if (item.sender === auth.email) {
                            return <li key={index} className="ChatBox__message-right ChatBox__message"><span>{item.content}</span></li>
                        }

                        return (<li key={index} className="ChatBox__message-left ChatBox__message">
                            <Avatar image={item.avatar} size="35px" />
                            <span>{item.content}</span>
                        </li>)
                    })
                }


                {searchInput && searchResult.length === 0 && !receiver && <li>Your search did not match any contacts</li>}

                {
                    searchInput && searchResult.length > 0 && !receiver &&
                    searchResult.map((item, index) =>
                        <li key={index}>
                            <RowItem image={item.avatar} text={item.name} onClick={() => setReceiver(item)} />
                        </li>
                    )
                }
            </ul>

            {receiver &&
                <div className="ChatBox__bottom">
                    <form onSubmit={handleSendMessage} className="ChatBox__input">
                        <input type="text" placeholder='Aa' value={msgInput} onChange={(e) => setMsgInput(e.target.value)} />
                    </form>
                </div>
            }

        </div>
    )
}

export default ChatBox