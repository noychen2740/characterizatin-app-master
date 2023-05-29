import React, { useEffect, useState } from 'react'
import './ChatPage.css'
import { chatService } from '../../services/chat.service'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import TopOfAplication from '../TopOfAplication';
import Navigation from '../Navigation';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
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
            <TopOfAplication label='Chat'/>
            {chat && chat.messages.map((m) => {
                console.log({ m });
                return <div key={m.id} className="message">
                    {m.txt}
                </div>
            })}
            <Box style={{position: 'fixed', alignItems:'center',bottom: 60, left: 280, right: 0}} sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab variant="extended">
        <NavigationIcon sx={{ mr: 1 }} />
      </Fab>
    </Box>
            <input type='text' style={{position: 'fixed', alignItems:'center',bottom: 80, left: 10, right: 80}}>
            
            </input>
            <Navigation></Navigation>
        </div>
    )
}

export default ChatPage