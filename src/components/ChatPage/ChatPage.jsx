import React, { useEffect, useState } from 'react'
import './ChatPage.css'
import { chatService } from '../../services/chat.service'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import TopOfAplication from '../TopOfAplication';
import Navigation from '../Navigation';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
function ChatPage() {
    const nav = useNavigate()
    const { userEmail2 } = useParams()
    const [chat, setChat] = useState()
    const [txt, setTxt] = useState('')
    useEffect(() => {
        loadChat()
    }, [])

    const handleChange = (ev) => { //לוקח את הפרמטרים ש/מזינים בפורם
        let { name, value } = ev.target;
        setTxt(value)
    };
    async function loadChat() {
        const q = await chatService.getChat(userEmail2)
        let res;
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach(async (document) => {
                res = { ...document.data(), id: document.id }
                const promisses = await res.messages.map(async (messageId) => {
                    const docRef = doc(db, "messages", messageId);
                    const docSnap = await getDoc(docRef);
                    const meesage = { ...docSnap.data(), id: messageId }
                    return meesage
                })
                res.messages = await Promise.all(promisses)
                setChat(res)
            });
        });


      
    }

    async function submit() {
        console.log('submit');
        await chatService.createMsg(txt, chat)
    }

    return (
        <div className='chat-page'>
            <TopOfAplication label='Chat' />
            {chat && chat.messages.map((m) => {
                console.log({ m });
                return <div key={m.id} className="message">
                    {m.txt}
                </div>
            })}
            <Box onClick={submit} style={{ position: 'fixed', alignItems: 'center', bottom: 60, left: 280, right: 0 }} sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab variant="extended">
                    <NavigationIcon sx={{ mr: 1 }} />
                </Fab>
            </Box>
            <FormControl sx={{ m: 1, }} className='txt-input' variant="outlined">
                {/* <InputLabel htmlFor="outlined-adornment-email">תיאור הפרק</InputLabel> */}
                <OutlinedInput
                    onInput={handleChange}
                    multiline={true}
                    name='txt'
                    label=""
                    dir='rtl'
                    value={txt}
                />
            </FormControl>
            <Navigation></Navigation>
        </div>
    )
}

export default ChatPage