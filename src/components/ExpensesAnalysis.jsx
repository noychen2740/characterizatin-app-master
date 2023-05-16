
import { Avatar, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navigation from './Navigation'
import ProgressBar from './ProgressBar'
import TopOfAplication from './TopOfAplication'
import { LocalFireDepartment, Percent, PointOfSale, QueryStats, Savings } from '@mui/icons-material'
import GraphsBar from './GraphsBar';
import { getEnv } from '../utils/env'

export default function ExpensesAnalysis() {
  const nav=useNavigate();
  const {state}=useLocation();
  useEffect(()=>{
    if (state!=undefined) {
      const obj=state;
      setUserBudget(obj)
    }
  },[])

  const [sumExpense, setSumExpense] = useState(1);/// הוצאות המשתמש
  const [userBudget, setUserBudget] = useState(1);//תקציב המשתמש כפי שהוגדר
  const [boolean, setBoolean] = useState(false);// בשביל ההצגה של הניתוחים
//// שייך להחזקת הנתונים שמועברים לגרפים של הניתוח
const [SumOfExpenseAtraction, setSumOfExpenseAtraction] = useState(0)
const [SumOfExpenseSleep, setSumOfExpenseSleep] = useState(0)
const [SumOfExpenseDrugs, setSumOfExpenseDrugs] = useState(0)
const [SumOfExpenseFood, setSumOfExpenseFood] = useState(0)
const [SumOfExpenseCasino, setSumOfExpenseCasino] = useState(0)
const [SumOfExpenseParty, setSumOfExpenseParty] = useState(0)
  const booleanop=(boolean)=>{
    if (boolean) {
      setBoolean(false)
    }
    else{
      setBoolean(true)
    }
  }/// שליטה על הצגה וסגיה של ניתוחים

//  useEffect(()=>{
//         const apiUrl='http://localhost:65095/api/users/getemail/?email=Benda669@gmail.com'
//         // const apiUrl='http://localhost:58583/api/users/1'
    
//         fetch(apiUrl, 
//           {
//           method: 'GET',
//           headers: new Headers({
//             'Content-Type':'application/json; charset=UTF-8',
//             'Accept':'application/json; charset=UTF-8',
//             })
            
//           })
//         .then(response => {
//          console.log('response= ',response);
//          console.log('response statuse=', response.status);
//          console.log('response.ok=', response.ok)
        
//         return response.json()
//         })
//         .then(
//           (result)=>{
//             console.log("fetch get user by id=", result);
//             console.log("result=", result.UserFirstName);
//             setUserInApp(result); // השמה של המשתמש שהגיע מהדאטה בייס להמשך עבודה בצד שרת
//             setUserBudget(result.UserBudget)
//             console.log('first name=', result.UserFirstName)
//             console.log('first name=', result.UserLastName)
//             console.log('budget=', result.UserBudget)

//           },
//         (error) => {
//         console.log("err post=", error);
//         });     
    
//           },[])// הבאת פרטי המשתמש- שימוש לתקציב שכן נקבע בדף ניהול תקציב
          
useEffect(()=>{
const apiUrl= getEnv() + '/api/expenses/getsumofall/?email=Benda669@gmail.com'
fetch(apiUrl, 
{
  method: 'GET',
 headers: new Headers({
'Content-Type':'application/json; charset=UTF-8',
'Accept':'application/json; charset=UTF-8',
 }),
     
})
.then(response => {
console.log('response= ',response);
console.log('response statuse=', response.status);
console.log('response.ok=', response.ok)
return response.json()
})
   .then(
 (result)=>{
 console.log("fetch get  sumOfExpense =", result);
                        // console.log("result=", result.UserFirstName);
setSumOfExpenseAtraction(result.SumOfExpenseAtraction); // השמה של המשתמש שהגיע מהדאטה בייס להמשך עבודה בצד שרת
setSumOfExpenseSleep(result.SumOfExpenseSleep)
setSumOfExpenseDrugs(result.SumOfExpenseDrugs)
setSumOfExpenseFood(result.SumOfExpenseFood)
setSumOfExpenseCasino(result.SumOfExpenseCasino)
setSumOfExpenseParty(result.SumOfExpenseParty)
setSumExpense(result.SumOfExpense)
 },
 (error) => {
 console.log("err post=", error);
 });     
                
 },[]) //לדאטה בגרף 
 const Data = [
  {
    id: 1,
    KindOfExpenses: 'אטרקציות',
    sumOfExpense: SumOfExpenseAtraction,
    // userLost: 8230
  },
  {
    id: 2,
    KindOfExpenses: 'לינה',
    sumOfExpense: SumOfExpenseSleep,
    // userLost: 345
  },
  {
    id: 3,
    KindOfExpenses: 'מזון',
    sumOfExpense: SumOfExpenseFood,
    // userLost: 555
  },
  {
    id: 4,
    KindOfExpenses: 'בילויים',
    sumOfExpense: SumOfExpenseParty,
    // userLost: 4555
  },
  {
    id: 5,
    KindOfExpenses: 'סמים',
    sumOfExpense: SumOfExpenseDrugs,
    // userLost: 234
  },
  {
    id: 6,
    KindOfExpenses: 'הימורים',
    sumOfExpense: SumOfExpenseCasino,
    // userLost: 234
  }
];
const DataPrecent = [
  {
    id: 1,
    KindOfExpenses: 'אטרקציות',
    sumOfExpense: parseInt(SumOfExpenseAtraction/sumExpense*100),
    // userLost: 8230
  },
  {
    id: 2,
    KindOfExpenses: 'לינה',
    sumOfExpense: parseInt(SumOfExpenseSleep/sumExpense*100),
    // userLost: 345
  },
  {
    id: 3,
    KindOfExpenses: 'מזון',
    sumOfExpense: parseInt(SumOfExpenseFood/sumExpense*100),
    // userLost: 555
  },
  {
    id: 4,
    KindOfExpenses: 'בילויים',
    sumOfExpense: parseInt(SumOfExpenseParty/sumExpense*100),
    // userLost: 4555
  },
  {
    id: 5,
    KindOfExpenses: 'סמים',
    sumOfExpense: parseInt(SumOfExpenseDrugs/sumExpense*100),
    // userLost: 234
  },
  {
    id: 6,
    KindOfExpenses: 'הימורים',
    sumOfExpense: parseInt(SumOfExpenseCasino/sumExpense*100),
    // userLost: 234
  }
];
    return (
    <div>
      <TopOfAplication label='ניתוח הוצאות'/>
      <Card sx={{ minWidth: 275  }} style={{marginTop:'60px'}} >
      <img className="App-logo" src="analysis3.png" style={{marginTop:'15px'}} />
      <CardContent >
      <Chip icon={<Savings/>} style={{color:'ActiveCaption',marginBottom:'30px', height:'60px', width:'255px' }}  label={` ₪ ${userBudget} תקציב הטיול`}   variant="outlined" />

        <Typography variant="body2" >
          <br />
          {''}
          <ProgressBar sumOfexpenses={sumExpense} completed={parseInt((sumExpense/userBudget)*100)}/>
        </Typography>
        <Stack direction="row" spacing={2} style={{marginTop:'35px'}}>
          <Chip icon={<LocalFireDepartment style={{color:'red'}} />} label={` ₪ ${sumExpense} נשרפו`} color="error" variant="outlined" />
          <Chip icon={<PointOfSale/>} label={` ₪ ${userBudget-sumExpense} זמינים`} color="success" variant="outlined" />
          </Stack>
      </CardContent>
      <CardActions >
        <Avatar style={{marginLeft:'auto', marginRight:'auto',backgroundColor:'#598e89',borderRadius:'90%'}} size='small' onClick={() => {booleanop(boolean)}} variant="contained" >
            <QueryStats/>
        </Avatar>
      {/* <Button style={{marginLeft:'auto', marginRight:'auto',backgroundColor:'#598e89',borderRadius:'90%'}} size='small' onClick={() => {booleanop(boolean)}} variant="contained" > {<QueryStats/>}</Button> */}
      </CardActions>
    </Card>
    {boolean==true&&<GraphsBar Data={Data} DataPrecent={DataPrecent}/>}
      <Navigation pagNav={'budget'}/>
    </div>
  )
}
