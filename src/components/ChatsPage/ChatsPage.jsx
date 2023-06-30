import React, { useEffect, useState } from 'react'
import './ChatsPage.css'
import { chatService } from '../../services/chat.service'
import { useNavigate } from 'react-router-dom'
import TopOfAplication from '../TopOfAplication'
import Navigation from '../Navigation'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { userService } from '../../services/user.service'
import { doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
function ChatsPage({ userFromDB }) {
  const nav = useNavigate()
  // const [chats, setChats] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    // loadChats()
    console.log({ userFromDB });
    if (userFromDB) {
      loadUsers()
    }
  }, [userFromDB])

  // async function loadChats() {
  //     const res = await chatService.getAllChats()
  //     console.log(res);
  //     setChats(res)
  // }

  async function loadUsers() {
    const res = await userService.getAll()
    console.log({ ...res });
    let inc = 0
    let loadUsers = false
    res.forEach(async (u) => {
      const q = await chatService.getChat(u.UserEmail, userFromDB.UserEmail)
      const docs = await getDocs(q)
      let chat;
      inc++
      docs.docs.forEach(async (document) => {
        chat = { ...document.data(), id: document.id }
        console.log(chat.id, u.UserEmail);
        chat.messages = chat?.messages?.length ? chat.messages : [];
        const promisses = await chat.messages.map(async (messageId) => {
          const docRef = doc(db, "messages", messageId);
          const docSnap = await getDoc(docRef);
          const meesage = { ...docSnap.data(), id: messageId }
          return meesage
        })
        chat.messages = await Promise.all(promisses)
        u.unread = !!chat.messages.filter(m => m.userEmail !== userFromDB.UserEmail).find((m) => !m.isRead)
        if (inc === res.length && !loadUsers) {
          console.log('overrr', [...res]);
          loadUsers = true
          setUsers(res)
        }

      })

    })
  }



  return (
    <div className='chat-page'>
      <TopOfAplication label='צ"אט' />
      <br></br>
      <br></br>
      {users.map((c) => {
        console.log(c.UserEmail, c.unread);
        return <div key={c.UserEmail} className={c.unread ? "chat unread" : "chat"} onClick={() => nav(`/chat/${c.UserEmail}`)}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={c.userEmail2} src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              key={c.id}
              primary={c.UserFirstName + ' ' + c.UserLastName}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Hi!
                  </Typography>
                  {' — Lets talk :)'}
                </React.Fragment>

              }
            />
          </ListItem>
          <Divider variant="inset" />
        </div>
      })}
      <Navigation></Navigation>
    </div>
  )
}

export default ChatsPage