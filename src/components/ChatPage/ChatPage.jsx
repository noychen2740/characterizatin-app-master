import React, { useEffect, useState } from 'react'
import './ChatPage.css'
import { chatService } from '../../services/chat.service'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

function ChatPage() {
    const nav = useNavigate()
    const { userEmail2 } = useParams()
    const [chat, setChat] = useState()
    useEffect(() => {
        loadChat()
    }, [])

    async function loadChat() {
        const snapshot = await chatService.getChat(userEmail2)
        let res;
        snapshot.forEach(async (document) => {
            res = document.data()
            const promisses = await res.messages.map(async (messageId) => {
                const docRef = doc(db, "messages", messageId);
                const docSnap = await getDoc(docRef);
                const meesage = { ...docSnap.data(), id: messageId }
                return meesage
            })
            res.messages = await Promise.all(promisses)
            setChat(res)
        });
    }
    return (
        <div className='chat-page'>
            <div className="title">Chat</div>
            {chat && chat.messages.map((m) => {
                console.log({ m });
                return <div key={m.id} className="message">
                    {m.txt}
                </div>
            })}
        </div>
    )
}

export default ChatPage