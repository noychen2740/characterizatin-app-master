
import styled from '@emotion/styled';
import { Avatar, Badge, BottomNavigation, BottomNavigationAction, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Box, margin, padding, Stack } from '@mui/system';
import AutoStories from '@mui/icons-material/AutoStories';
import HikingIcon from '@mui/icons-material/Hiking';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Navigation from './Navigation';
import Paper from '@mui/material/Paper';
import TopOfAplication from './TopOfAplication';
import { Celebration, SelfImprovement } from '@mui/icons-material';
import { resolvePath, useNavigate } from 'react-router-dom';
import { getEnv } from '../utils/env';
import { storageService } from '../services/storage.service';
import { file } from '@babel/types';
import { userService } from '../services/user.service';
import { async } from '@firebase/util';

export default function UserProfile(props) {

  const nav = useNavigate();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      // boxShadow:'0 0 0 20px',
      boxShadow: '0 0 0 2px ${theme.palette.background.paper}',
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  const [checkType, setCheckType] = useState('')
// const saveChange=async() => {
//   const newName = await userService.updateIMG(file.name)
//   console.log(newName)
// }
  const [userInApp, setUserInApp] = useState('');// בתאכלס, משתמש ישלח כבר מעטר, עד החיבור מביא אותו בגט לפי מיקום
  const [form, setForm] = useState();
  const handleChange = async (ev) => { //לוקח את הפרמטרים ש/מזינים בפורם

    let { name, value } = ev.target;
    if (name==='UserImg') {
      console.log(name);
      const file = ev.target.files[0]
      console.log({ file });
      if (file) {
        const url = await storageService.upload(file)//////////// בדיקה
        console.log(url)
        const data=await userService.updateIMG(url,props.userEmailFromDB)
        console.log(data)
        setForm({ ...form, [name]: url });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
    

    
  };

  useEffect(() => {
    const email = props.userEmailFromDB;
    const apiUrl = getEnv() + '/users/getemail/?email='
    // const apiUrl='http://localhost:58583/api/users/1'

    fetch(apiUrl + props.userFromDB.UserEmail,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        })

      })
      .then(response => {
        console.log('response= ', response);
        console.log('response statuse=', response.status);
        console.log('response.ok=', response.ok)

        return response.json()
      })
      .then(
        (result) => {
          console.log("fetch get user by id=", result);
          console.log("result=", result.UserFirstName);
          setUserInApp(result); // השמה של המשתמש שהגיע מהדאטה בייס להמשך עבודה בצד שרת
          console.log('first name=', userInApp.UserFirstName)
          console.log('first name=', userInApp.UserLastName)

        },
        (error) => {
          console.log("err post=", error);
        });

  }, [])// משתמש שנכנס לראשונה לתהליך האפיון נכנס עם טייפ רייק- לאחר העדכון של האפיון נראצ הלהביא מחדש את המשתמש לאחר השינויים


  useEffect(() => {

    if (userInApp.UserType == 'מוצילר') {
      setCheckType(<HikingIcon />)
    }
    if (userInApp.UserType == 'בליין') {

      setCheckType(<Celebration />)
    }
    if (userInApp.UserType == 'ציל') {

      setCheckType(<SelfImprovement />)
    }

  }, [userInApp.UserType])/// מתעדכן לאחר כל שינוי של הטייפ של המתשמש בדאטה בייס

  return (
    <>
      <TopOfAplication label='הפרופיל שלי' />

      <img className="App-logo" src="logo.png" style={{ marginTop: '5px', width: '120px' }} />

      <Box style={{ marginBottom: '5px', backgroundColor: '#eeeeee', margin: '1px', padding: '25px', borderRadius: '5%' }}>
        <Stack direction={"row"} spacing={5} justifyContent={'space-around'} >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            variant="dot"
          >
            <Avatar sx={{ width: 64, height: 64 }} src= {props.userFromDB.UserImg} style={{ display: 'flex' }} onClick={() => {alert('bdike')}} />
    
          </StyledBadge>

          <p style={{ color: 'black' }}>שלום {props.userFromDB.UserFirstName} <br /> {props.userEmailFromDB} </p>
        </Stack>
      </Box>
      <div>
            <input className='imginput' type='file' name='UserImg' onChange={handleChange}  ></input>
      </div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar style={{
            marginTop: '20px', marginBottom: '15px'
          }}>
            <Avatar>
              <AutoStories onClick={() => { nav('/episodes') }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            style={{ textAlign: 'right' }}
            primary=" "
            secondary={
              <React.Fragment >
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  <b style={{ textAlign: 'center' }} > {'יומן המסע שלי'}</b>
                  <br />
                </Typography>
                {" לחץ על המחברת לצפייה בסיפור הדרך שלך"}

              </React.Fragment>
            }
          />
        </ListItem>

        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar style={{
            marginTop: '20px', marginBottom: '15px'
          }}>
            <Avatar>
              {checkType}
              {/* <HikingIcon/> */}
              {/* שליחת האייקון המתאים לפי הפרסונה שהתקבלה */}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            style={{ textAlign: 'right' }}
            primary=" "
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >

                  <b> {"אופיינת כ-" + userInApp.UserType}</b>
                  <br />
                </Typography>
                {"לחץ על האייקון על מנת ללמוד עוד אודות איפיון המערכת והמשמעות עבורך"}
              </React.Fragment>
            }
          />
        </ListItem>

        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar style={{
            marginTop: '20px', marginBottom: '15px'
          }}>
            <Avatar>
              <FavoriteIcon onClick={() => { nav('/Favorites') }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            style={{ textAlign: 'right' }}
            primary=" "
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  <b> {'המועדפים שלי'}</b>
                  <br />
                </Typography>
                {"לחץ על ה-לב לצפייה ברשימת המועדפים שלך"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>

      <Navigation pagNav={'profile'} />
    </>
  )

}
