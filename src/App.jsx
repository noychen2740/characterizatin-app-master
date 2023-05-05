import './App.css';
import Questionnaire from './components/Questionnaire';
import { useEffect, useState } from 'react';
import Question from './components/Question';
import Persona from './components/Persona';
import UserProfile from './components/UserProfile';
import Budget from './components/Budget';
import NewExpense from './components/NewExpense';
import { Route, Routes } from 'react-router-dom';
import ExpensesAnalysis from './components/ExpensesAnalysis';
import Map from './components/Map';
import Login from './components/Login';
import Signup from './components/Signup';
import Episodes from './components/Episodes/Episodes';
import CreateEpisode from './components/CreateEpisode/CreateEpisode';
import EpisodePage from './components/EpisodePage/EpisodePage';
import CreateFeedback from './components/CreateFeedback/CreateFeedback';
import Feedbacks from './components/Feedbacks/Feedbacks';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  const [userInApp, setUserInApp] = useState('');// בתאכלס, משתמש ישלח כבר מעטר, עד החיבור מביא אותו בגט לפי מיקום
  const [expensesInApp, setExpensesInApp] = useState('');/// הבאה בצורה אסינכורית את כל ההוצאות של המשתמש

  useEffect(() => {
    const apiUrl = 'http://localhost:65095/api/users/getemail/?email=Benda669@gmail.com'
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
          console.log("fetch get user by id=", result);
          console.log("result=", result.UserFirstName);
          setUserInApp(result); // השמה של המשתמש שהגיע מהדאטה בייס להמשך עבודה בצד שרת
          console.log('first name=', result.UserFirstName)
          console.log('first name=', result.UserLastName)
          console.log('budget=', result.UserBuget)

        },
        (error) => {
          console.log("err post=", error);
        });

  }, [])

  useEffect(() => {
    const apiUrl = 'http://localhost:65095/api/expenses/?email=Benda669@gmail.com'
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


  return (
    <div className="App" >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="App-characterizatin">

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="Questionnaire" element={<Questionnaire name={userInApp.UserFirstName} />} />
            <Route path="firstQues" element={<Question pageNum='first' />} />
            <Route path="secondQues" element={<Question name={userInApp.UserFirstName} pageNum='second' />} />
            <Route path="PersonaM" element={<Persona name={userInApp.UserLastName} pageNum='mucillar' />} />
            <Route path="PersonaB" element={<Persona name={userInApp.UserFirstName} pageNum='balyanim' />} />
            <Route path="PersonaC" element={<Persona name={userInApp.UserFirstName} pageNum='chill' />} />
            <Route path="userProfile" element={<UserProfile name={userInApp.UserFirstName} email={userInApp.UserEmail} />} />
            <Route path="budget" element={<Budget allExpenes={expensesInApp} bug={userInApp.UserBudget} />} />
            {/* <Route path="budget" element={<Budget allExpenes={expensesInApp} continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}} navToChange={(exNum) => {setNumOfExpense(exNum)}}/>}/>  */}
            <Route path="profile" element={<UserProfile name={userInApp.UserFirstName} email={userInApp.UserEmail} personaType={userInApp.UserType} />} />
            {/* <Route path="profile" element={<UserProfile name={userInApp.UserFirstName} email={userInApp.UserEmail} personaType={userInApp.UserType} continueClicked={(navigaitionTo) => { setPage(navigaitionTo)}}/>}/>  */}
            {/* <Route path="NewExpense" element={<NewExpense title={numOfExpense.ExpensesTitle} price={numOfExpense.PricePerOne} amount={numOfExpense.NumberOfRepeatExpenses} ExKey={numOfExpense.ExpensesKey} Ecategory={numOfExpense.KindOfExpenses} />}/>  */}
            <Route path="NewExpense" element={<NewExpense />} />
            <Route path="Analysis" element={<ExpensesAnalysis />} />
            <Route path="map" element={<Map />} />
            <Route path='episodes' element={<Episodes />} />
            <Route path='create-episode/:NameOfChapter' element={<CreateEpisode />} />
            <Route path='create-episode' element={<CreateEpisode />} />
            <Route path='episode/:NameOfChapter' element={<EpisodePage />} />
            <Route path='CreateFeedback' element={<CreateFeedback />} />
            <Route path='Feedbacks' element={<Feedbacks />} />

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
      </LocalizationProvider>

    </div >
  );
}

export default App;
