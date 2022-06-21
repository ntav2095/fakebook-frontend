
import useAuth from '../../Auth/useAuth'
import useChat from '../../Context/useChat'

import ChatBox from './ChatBox/ChatBox'

import './Chat.scss'

function Chat() {

    const { showChat, setShowChat } = useChat()

    return (
        <div className='Chat'>
            {showChat && <ChatBox />}
            <button
                className="chatBtn"
                onClick={() => setShowChat(prev => !prev)}>
                <i className="fa fa-edit"></i>
            </button>
        </div>
    )
}

export default Chat