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
import { userService } from '../../services/user.service'
function ChatPage() {
    const nav = useNavigate()
    const { userEmail2 } = useParams()
    const [chat, setChat] = useState()
    const [txt, setTxt] = useState('')
    const userEmail = "Benda669@gmail.com"
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

        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            console.log(querySnapshot.docs);
            if (querySnapshot?.docs?.length) {
                querySnapshot.forEach(async (document) => {
                    console.log(document.data());
                    res = { ...document.data(), id: document.id }
                    const promisses = await res.messages.map(async (messageId) => {
                        const docRef = doc(db, "messages", messageId);
                        const docSnap = await getDoc(docRef);
                        const meesage = { ...docSnap.data(), id: messageId }
                        return meesage
                    })
                    res.messages = await Promise.all(promisses)
                    const users = await userService.getAll()
                    const currentUser = users.find(u => u.UserEmail === res.userEmail2)
                    console.log({ currentUser });
                    res.username = `${currentUser?.UserFirstName} ${currentUser?.UserLastName}`
                    setChat(res)
                });
            } else {
                console.log('else');
                await chatService.createChat(userEmail2)
                loadChat()
            }

        });



    }

    async function submit() {
        console.log('submit');
        await chatService.createMsg(txt, chat)
        setTxt('')
    }

    return (
        <div className='chat-page'>
            <TopOfAplication label={chat?.username || 'Chat'} />
            <br></br>
            <br></br>
            <br></br>
            <div className="messages">
                {chat && chat.messages.map((m) => {

                    return <div key={m.id} className={m.userEmail === userEmail ? "right-message message" : "left-message message"}   >
                        <span>  {m.txt}</span>
                        <span className={m.userEmail === userEmail ? "time right-time" : "time left-time"}>10:47</span>
                    </div>
                })}
            </div>
            
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
            <br></br>
            <br></br>
            
            <Navigation></Navigation>
        </div>
    )
}

export default ChatPage