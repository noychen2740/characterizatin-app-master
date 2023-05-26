import React, { useEffect, useState } from 'react'
import './ChatPage.css'
import { chatService } from '../../services/chat.service'
function ChatPage() {

    const [chats, setChats] = useState([])
    useEffect(() => {
        loadChats()
    }, [])


    async function loadChats() {
        const res = await chatService.getAllChats()
        console.log(res);
        setChats(res)
    }
    return (
        <div className='chat-page'>
            <div className="title">Chat</div>

            {chats.map((c) => {
                return <div className="chat">
                    {c.userEmail1}
                </div>
            })}
        </div>
    )
}

export default ChatPage