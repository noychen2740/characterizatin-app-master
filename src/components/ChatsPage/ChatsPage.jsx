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
function ChatsPage() {
  const nav = useNavigate()
  // const [chats, setChats] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    // loadChats()
    loadUsers()
  }, [])

  // async function loadChats() {
  //     const res = await chatService.getAllChats()
  //     console.log(res);
  //     setChats(res)
  // }

  async function loadUsers() {
    const res = await userService.getAll()
    setUsers(res)
  }



  return (
    <div className='chat-page'>
      <TopOfAplication label='צ"אט' />
      <br></br>
      <br></br>
      {users.map((c) => {
        return <div key={c.UserEmail} className="chat" onClick={() => nav(`/chat/${c.UserEmail}`)}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={c.userEmail2} src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              key={c.id}
              primary={c.UserFirstName+' '+c.UserLastName}
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