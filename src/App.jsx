import './App.css';
import Questionnaire from './components/Questionnaire';
import { useEffect, useState } from 'react';
import Question from './components/Question';
import Persona from './components/Persona';
import UserProfile from './components/UserProfile';
import Budget from './components/Budget';
import NewExpense from './components/NewExpense';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ExpensesAnalysis from './components/ExpensesAnalysis';
import Map from './components/Map';
import Login from './components/Login';
import Favorites from './components/Favorites/Favorites';
import Signup from './components/Signup';
import Episodes from './components/Episodes/Episodes';
import CreateEpisode from './components/CreateEpisode/CreateEpisode';
import EpisodePage from './components/EpisodePage/EpisodePage';
import CreateFeedback from './components/CreateFeedback/CreateFeedback';
import Diary from './components/Diary/Diary';
import FeedbackPage from './components/FeedbackPage/FeedbackPage';
import Feedbacks from './components/Feedbacks/Feedbacks';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ThanksPage from './components/ThanksPage/ThanksPage';
import { getEnv } from './utils/env';
import ChatsPage from './components/ChatsPage/ChatsPage';
import ChatPage from './components/ChatPage/ChatPage';
import Fab from '@mui/material/Fab';
import ForumIcon from '@mui/icons-material/Forum';
import { chatService } from './services/chat.service';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { userService } from './services/user.service';
import { db } from './firebase';
import { Badge } from '@mui/material';
import styled from '@emotion/styled';
import ChangePassword from './components/ChangePassword';
import ChangePasswordCom from './components/ChangePasswordCom';
import KpiCard from './components/KpiCard';
import GeographyChart from './components/GeographyChart';
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#f00',
    color: '#f00',
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
function App() {
  const [userInApp, setUserInApp] = useState('');// בתאכלס, משתמש ישלח כבר מעטר, עד החיבור מביא אותו בגט לפי מיקום
  const [expensesInApp, setExpensesInApp] = useState('');/// הבאה בצורה אסינכורית את כל ההוצאות של המשתמש
  const [chatVisiable, setChatVisiable] = useState(false);/// הבאה בצורה אסינכורית את כל ההוצאות של המשתמש
  const nav = useNavigate();
  const location = useLocation();
  const chatPaths = ['/profile', '/budget', '/map', '/episodes', '/Favorites']
  const [isRead, setIsRead] = useState(true)
  useEffect(() => {
    if (chatPaths.includes(location.pathname)) {
      setChatVisiable(true)
    } else {
      setChatVisiable(false)
    }
  }, [location]);

  useEffect(() => {
    const apiUrl = getEnv() + '/users/getemail/?email=Benda669@gmail.com';
    // const apiUrl = 'https://localhost:44300/users/getemail/?email=Benda669@gmail.com';
    fetch(apiUrl,
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
          console.log("result=", result.UserFirstName);
          setUserInApp(result); // השמה של המשתמש שהגיע מהדאטה בייס להמשך עבודה בצד שרת
          console.log('first name=', result.UserFirstName)
          console.log('first name=', result.UserLastName)
          console.log('budget=', result.UserBudget)

        },
        (error) => {
          console.log("err post=", error);
        });

  }, [])

  useEffect(() => {
    loadFullChats()
  }, [])


  const loadFullChats = async () => {
    // const chats = []
    const users = await userService.getAll()

    const q = await chatService.getAllMsgs()

    onSnapshot(q, async () => {
      const querySnapshot = await chatService.loadFullChats()

      const promises = await querySnapshot.docs.map(async (document) => {
        const chat = { ...document.data(), id: document.id }
        const currentUser = users.find(u => u.UserEmail === chat.userEmail2)
        chat.messages = chat?.messages?.length ? chat.messages : [];
        const promisses = await chat.messages.map(async (messageId) => {
          const docRef = doc(db, "messages", messageId);
          const docSnap = await getDoc(docRef);
          const meesage = { ...docSnap.data(), id: messageId }
          return meesage
        })
        chat.messages = await Promise.all(promisses);
        const unreadMsgs = chat.messages.filter((m) => !m?.isRead && m.userEmail !== "noycn27@gmail.com")
        chat.isRead = !unreadMsgs.length
        chat.username = `${currentUser?.UserFirstName} ${currentUser?.UserLastName}`
        console.log('added chat');
        // chats.push(chat);
        return chat
      });


      const chats = await Promise.all(promises)
      const unReadChat = chats.find(c => {
        console.log(c.isRead);
        return !c.isRead
      });
      console.log({ unReadChat });
      setIsRead(!unReadChat)

      console.log('here after x');
    })
    //const querySnapshot = await chatService.loadFullChats()

  }

  useEffect(() => {
    loadUser()
    const apiUrl = getEnv() + '/expenses/?email=Benda669@gmail.com'
    fetch(apiUrl,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        }),

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
          setExpensesInApp(result); // השמה של המשתמש שהגיע מהדאטה בייס להמשך עבודה בצד שרת
          console.log('UserEmail', result[0].UserEmail)
          console.log('ExpensesTitle=', result[0].ExpensesTitle)
          console.log(result.length);
          const lengthOfArr = result.length;

        },
        (error) => {
          console.log("err post=", error);
        });
  }, [])

  ////////////////////////////////////////////////////////

  const [userEmailFromDB, setUserEmailFromDB] = useState('');
  const [userFromDB, setUserFromDB] = useState('');//שינוי של עומר לשרשור היוזר

  const getUserEmail = (email) => {
    setUserEmailFromDB(email)
    console.log('get send email !!')
    console.log(email)
  }

  const getUser = (user) => {
    setUserFromDB(user)
    console.log('get send user !!')
    console.log(user)
  }

  const loadUser = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setUserFromDB(user)
      setUserEmailFromDB(user.UserEmail)

    } else {
      nav('/')
    }
  }




  return (
    <div className="App" >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="App-characterizatin">

          <Routes>
            <Route path="/" element={<Login getEmail={getUserEmail} getUser={getUser} />} />
            <Route path='/ChangePassword' element={<ChangePassword/>}/>
            <Route path='/ChangePasswordCom' element={<ChangePasswordCom userFromDB={userFromDB} userEmailFromDB={userEmailFromDB}/>}/>
            <Route path="signup" element={<Signup />} />
            <Route path="Questionnaire" element={<Questionnaire userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} />} />
            {/* <Route path="Questionnaire" element={<Questionnaire name={userInApp.UserFirstName} />} /> */}
            <Route path="firstQues" element={<Question pageNum='first' userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} />} />
            <Route path="secondQues" element={<Question userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} pageNum='second' />} />
            {/* <Route path="secondQues" element={<Question name={userInApp.UserFirstName} pageNum='second' />} /> */}
            <Route path="PersonaM" element={<Persona userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} pageNum='mucillar' />} />
            <Route path="PersonaB" element={<Persona userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} pageNum='balyanim' />} />
            <Route path="PersonaC" element={<Persona userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} pageNum='chill' />} />
            {/* <Route path="PersonaM" element={<Persona name={userInApp.UserLastName} pageNum='mucillar' />} />
            <Route path="PersonaB" element={<Persona name={userInApp.UserFirstName} pageNum='balyanim' />} />
            <Route path="PersonaC" element={<Persona name={userInApp.UserFirstName} pageNum='chill' />} /> */}
            <Route path="userProfile" element={<UserProfile userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} />} />
            {/* <Route path="userProfile" element={<UserProfile name={userInApp.UserFirstName} email={userInApp.UserEmail} />} /> */}
            <Route path="budget" element={<Budget userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} allExpenes={expensesInApp} bug={userFromDB.UserBudget} />} />
            {/* <Route path="budget" element={<Budget allExpenes={expensesInApp} bug={userInApp.UserBudget} />} /> */}
            {/* <Route path="budget" element={<Budget allExpenes={expensesInApp} continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}} navToChange={(exNum) => {setNumOfExpense(exNum)}}/>}/>  */}
            <Route path="profile" element={userFromDB ? <UserProfile userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} personaType={userFromDB.UserType} /> : <div>Loading...</div>} />
            {/* <Route path="profile" element={<UserProfile name={userInApp.UserFirstName} email={userInApp.UserEmail} personaType={userInApp.UserType} />} /> */}
            {/* <Route path="profile" element={<UserProfile name={userInApp.UserFirstName} email={userInApp.UserEmail} personaType={userInApp.UserType} continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}/>  */}
            {/* <Route path="NewExpense" element={<NewExpense title={numOfExpense.ExpensesTitle} price={numOfExpense.PricePerOne} amount={numOfExpense.NumberOfRepeatExpenses} ExKey={numOfExpense.ExpensesKey} Ecategory={numOfExpense.KindOfExpenses} />}/>  */}
            <Route path="NewExpense" element={<NewExpense userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} />} />
            {/* <Route path="NewExpense" element={<NewExpense />} /> */}
            <Route path="Analysis" element={<ExpensesAnalysis userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} />} />
            {/* <Route path="Analysis" element={<ExpensesAnalysis />} /> */}
            <Route path="map" element={<Map />} />
            {/* <Route path="map" element={<Map />} /> */}
            <Route path='episodes' element={<Episodes userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} />} />
            {/* <Route path='episodes' element={<Episodes />} /> */}
            <Route path='favorites' element={<Favorites userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} />} />
            {/* <Route path='favorites' element={<Favorites />} /> */}
            {/* <Route path='favorite/:id' element={<FavoritePage />} /> */}
            <Route path='create-episode/:NameOfChapter' element={<CreateEpisode userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} />} />
            {/* <Route path='create-episode/:NameOfChapter' element={<CreateEpisode />} /> */}
            <Route path='create-episode' element={<CreateEpisode userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} />} />
            {/* <Route path='create-episode' element={<CreateEpisode  />} /> */}
            <Route path='episode/:NameOfChapter' element={<EpisodePage userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} />} />
            {/* <Route path='episode/:NameOfChapter' element={<EpisodePage />} /> */}
            <Route path='CreateFeedback' element={<CreateFeedback />} />
            <Route path='Feedbacks' element={<Feedbacks />} />
            <Route path='ThanksPage' element={<ThanksPage />} />
            <Route path='Diary' element={<Diary />} />
            <Route path='FeedbackPage/:FeedbackKey' element={<FeedbackPage />} />
            <Route path='chats' userFromDB={userFromDB} element={<ChatsPage />} />
            {/* <Route path='chats' element={<ChatsPage />} /> */}
            <Route path='chat/:userEmail2' element={<ChatPage userFromDB={userFromDB} userEmailFromDB={userEmailFromDB} />} />
            {/* <Route path='chat/:userEmail2' element={<ChatPage />} /> */}
            <Route path='KpiCard' element={<KpiCard category={'אטרקציות'} expend={'852'} precent={'55'}/>} />
            {/* <Route path='GeographyChart' element={<GeographyChart/>} /> */}

          </Routes>


          {/* <Questionnaire name="עומר"/> */}

          {/* {page === 'Questionnaire' && <Questionnaire  name={userInApp.UserFirstName} continueClicked={() => { setPage('firstQues') } } />}
{page === 'firstQues' && <Question pageNum='first' continueClicked={() => { setPage('secondQues') }} />}
{page === 'secondQues' && <Question name={userInApp.UserFirstName} pageNum='second' continueClicked={(navigaitionTo) => { setPage(navigaitionTo) }}/>}

{page === 'PersonaM' && <Persona name={userInApp.UserLastName} pageNum='mucillar' continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}
{page === 'PersonaB' && <Persona name={userInApp.UserFirstName} pageNum='balyanim' continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}
{page === 'PersonaC' && <Persona name={userInApp.UserFirstName} pageNum='chill' continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}

{page === 'userProfile' && <UserProfile name={userInApp.UserFirstName} email={userInApp.UserEmail} personaType={userInApp.UserType} continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}

{page === 'budget' && <Budget allExpenes={expensesInApp} continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}} navToChange={(exNum) => {setNumOfExpense(exNum)}}/>}
{page === 'profile' && <UserProfile name={userInApp.UserFirstName} email={userInApp.UserEmail} personaType={userInApp.UserType} continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}

{page === 'NewExpense' && <NewExpense continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}} title={numOfExpense.ExpensesTitle} 
price={numOfExpense.PricePerOne} amount={numOfExpense.NumberOfRepeatExpenses} ExKey={numOfExpense.ExpensesKey} Ecategory={numOfExpense.KindOfExpenses} />} */}

          {/* <Questionnaire name="עומר"/> */}

        </div>
        {chatVisiable && <div className="chat-btn" >
          {!isRead ? <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            variant="dot"
          >
            <div className="chat-btn-container">
              <ForumIcon onClick={() => nav('chats')} />
            </div>
          </StyledBadge> : <div className="chat-btn-container">
            <ForumIcon onClick={() => nav('chats')} />
          </div>}
        </div>}



      </LocalizationProvider>

    </div >
  );
}

export default App;
