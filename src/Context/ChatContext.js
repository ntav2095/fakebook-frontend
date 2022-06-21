import { createContext, useState } from "react";



export const ChatContext = createContext({})

const ChatProvider = ({ children }) => {
    const [receiver, setReceiver] = useState(null)
    const [showChat, setShowChat] = useState(false)

    return (
        <ChatContext.Provider value={{ receiver, setReceiver, showChat, setShowChat }} >
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider