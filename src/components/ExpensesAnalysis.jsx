
import { Avatar, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navigation from './Navigation'
import ProgressBar from './ProgressBar'
import TopOfAplication from './TopOfAplication'
import { ArrowDropDown, ArrowDropUp, LocalFireDepartment, Percent, PointOfSale, QueryStats, Savings } from '@mui/icons-material'
import GraphsBar from './GraphsBar';
import { getEnv } from '../utils/env'
import { Kpi } from './Kpi'
import KpiChart from './KpiChart'
import GeographyChart from './GeographyChart'
import KpiCard from './KpiCard'

export default function ExpensesAnalysis(props) {
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


////שייך להחזקת הממוצעים להשוואת צרכנות
const [AvgOfExpenseAtraction, setAvgOfExpenseAtraction] = useState(0)
const [AvgOfExpenseSleep, setAvgOfExpenseSleep] = useState(0)
const [AvgOfExpenseDrugs, setAvgOfExpenseDrugs] = useState(0)
const [AvgOfExpenseFood, setAvgOfExpenseFood] = useState(0)
const [AvgOfExpenseCasino, setAvgOfExpenseCasino] = useState(0)
const [AvgOfExpenseParty, setAvgfExpenseParty] = useState(0)
const [AvgOfExpense, setAvgOfExpense] = useState(1);/// הוצאות המשתמש


useEffect(()=>{
// const apiUrl= getEnv() + '/expenses/getsumofall/?email=Benda669@gmail.com'
const apiUrl= getEnv() + '/expenses/getsumofall/?email='
fetch(apiUrl +props.userFromDB.UserEmail, 
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

///// הוספה של ממוצעי צריכה
const apiUrlA= getEnv() + '/expenses/statusOfExpenses/?email='
fetch(apiUrlA +props.userFromDB.UserEmail, 
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
setAvgOfExpenseAtraction(result.SumOfExpenseAtraction); // השמה של המשתמש שהגיע מהדאטה בייס להמשך עבודה בצד שרת
setAvgOfExpenseSleep(result.SumOfExpenseSleep)
setAvgOfExpenseDrugs(result.SumOfExpenseDrugs)
setAvgOfExpenseFood(result.SumOfExpenseFood)
setAvgOfExpenseCasino(result.SumOfExpenseCasino)
setAvgfExpenseParty(result.SumOfExpenseParty)
setAvgOfExpense(result.SumOfExpense)
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
    KindOfExpenses: 'התארגנות',
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
    KindOfExpenses: 'התארגנות',
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


    {boolean==true&&<KpiCard SumOfExpenseAtraction={SumOfExpenseAtraction} AvgOfExpenseAtraction={AvgOfExpenseAtraction}
    SumOfExpenseSleep={SumOfExpenseSleep} AvgOfExpenseSleep={AvgOfExpenseSleep}
    SumOfExpenseFood={SumOfExpenseFood} AvgOfExpenseFood={AvgOfExpenseFood}
    SumOfExpenseParty={SumOfExpenseParty} AvgOfExpenseParty={AvgOfExpenseParty}
    SumOfExpenseDrugs={SumOfExpenseDrugs} AvgOfExpenseDrugs={AvgOfExpenseDrugs}
    SumOfExpenseCasino={SumOfExpenseCasino} AvgOfExpenseCasino={AvgOfExpenseCasino}/>}
          
          
    {boolean==true&&<Card>
  <KpiChart AvgOfExpenseDrugs={AvgOfExpenseDrugs} AvgOfExpenseFood={AvgOfExpenseFood}
  AvgOfExpenseAtraction={AvgOfExpenseAtraction} AvgOfExpenseSleep={AvgOfExpenseSleep}
  AvgOfExpenseCasino={AvgOfExpenseCasino} AvgOfExpenseParty={AvgOfExpenseParty} SumOfExpenseAtraction={SumOfExpenseAtraction}
  SumOfExpenseSleep={SumOfExpenseSleep } SumOfExpenseDrugs={SumOfExpenseDrugs} SumOfExpenseFood={SumOfExpenseFood}
  SumOfExpenseCasino={SumOfExpenseCasino} SumOfExpenseParty={SumOfExpenseParty}/>
</Card>}
    {/* <Card sx={{ minWidth: 275  }} style={{marginTop:'60px'}} >
      <CardContent >
      <h4>צריכת משתמשים דומים לי</h4>

      <h5>אטרקציות</h5>
      {SumOfExpenseAtraction>AvgOfExpenseAtraction ?
        <Stack direction="column" spacing={2} style={{marginTop:'-25px'}}>
          <Chip label={` % ${parseInt(((SumOfExpenseAtraction-AvgOfExpenseAtraction))/AvgOfExpenseAtraction*100)} אטרקציות`} icon={<ArrowDropUp style={{color:'red'}} />}  color="error" variant="outlined" />
          
          </Stack>
          : <Stack direction="column" spacing={2} style={{marginTop:'-25px'}}>
          <Chip label={` % ${parseInt(((SumOfExpenseAtraction-AvgOfExpenseAtraction))/AvgOfExpenseAtraction*100)} אטרקציות`} icon={<ArrowDropDown style={{color:'green'}} />}  color="success" variant="outlined" />
          </Stack>}

          <h5>לינה</h5>
          {SumOfExpenseSleep>AvgOfExpenseSleep ?
          <Stack direction="column" spacing={2} style={{marginTop:'-25px'}}>
          <Chip icon={<ArrowDropUp style={{color:'red'}} />} label={` % ${parseInt(((SumOfExpenseSleep-AvgOfExpenseSleep))/AvgOfExpenseSleep*100)} `} color="error" variant="outlined" />
          </Stack>
          :<Stack direction="column" spacing={2} style={{marginTop:'-25px'}}>
          <Chip icon={<ArrowDropDown style={{color:'green'}} />} label={` % ${parseInt(((SumOfExpenseSleep-AvgOfExpenseSleep))/AvgOfExpenseSleep*100)} `} color="success" variant="outlined" />
          </Stack>}

          <h5>מזון</h5>
          {SumOfExpenseFood>AvgOfExpenseFood? 
          <Stack direction="column" spacing={2} style={{marginTop:'-25px'}}>
          <Chip icon={<ArrowDropUp style={{color:'red'}} />} label={` % ${parseInt((SumOfExpenseFood-AvgOfExpenseFood)/AvgOfExpenseFood*100)} `} color="error" variant="outlined" />
          </Stack>
          :<Stack direction="column" spacing={2} style={{marginTop:'-25px'}}>
          <Chip icon={<ArrowDropDown style={{color:'green'}} />} label={` % ${parseInt((SumOfExpenseFood-AvgOfExpenseFood)/AvgOfExpenseFood*100)} `} color="success" variant="outlined" />
          </Stack>}

          <h5>בילויים</h5>
          {SumOfExpenseParty>AvgOfExpenseParty? 
          <Stack direction="column" spacing={2} style={{marginTop:'-25px'}}>
          <Chip icon={<ArrowDropUp style={{color:'red'}} />} label={` % ${parseInt((SumOfExpenseParty-AvgOfExpenseParty)/AvgOfExpenseParty*100)} `} color="error" variant="outlined" />
          </Stack>
          :<Stack direction="column" spacing={2} style={{marginTop:'-25px'}}>
          <Chip icon={<ArrowDropDown style={{color:'green'}} />} label={` % ${parseInt((SumOfExpenseParty-AvgOfExpenseParty)/AvgOfExpenseParty*100)} `} color="success" variant="outlined" />
          </Stack>}

          <h5>סמים</h5>
          {SumOfExpenseDrugs>AvgOfExpenseDrugs ?
          <Stack direction="column" spacing={2} style={{marginTop:'-25px'}}>
          <Chip icon={<ArrowDropUp style={{color:'red'}} />} label={` % ${parseInt((SumOfExpenseDrugs-AvgOfExpenseDrugs)/AvgOfExpenseDrugs*100)} `} color="error" variant="outlined" />
          </Stack>
          :<Stack direction="column" spacing={2} style={{marginTop:'-25px'}}>
          <Chip icon={<ArrowDropDown style={{color:'green'}} />} label={` % ${parseInt((SumOfExpenseDrugs-AvgOfExpenseDrugs)/AvgOfExpenseDrugs*100)} `} color="success" variant="outlined" />
          </Stack>}

          <h5>הימורים</h5>
          {SumOfExpenseCasino-AvgOfExpenseCasino ? 
          <Stack direction="column" spacing={2} style={{marginTop:'-25px'}}>
          <Chip icon={<ArrowDropUp style={{color:'red'}} />} label={` % ${parseInt((SumOfExpenseCasino-AvgOfExpenseCasino)/AvgOfExpenseCasino*100)} `} color="error" variant="outlined" />
          </Stack>
          :<Stack direction="column" spacing={2} style={{marginTop:'-25px'}}>
          <Chip icon={<ArrowDropDown style={{color:'green'}} />} label={` % ${parseInt((SumOfExpenseCasino-AvgOfExpenseCasino)/AvgOfExpenseCasino*100)} `} color="success" variant="outlined" />
          </Stack>}

      </CardContent>
    </Card> */}




{/* <Card>
  <KpiChart AvgOfExpenseDrugs={AvgOfExpenseDrugs} AvgOfExpenseFood={AvgOfExpenseFood}
  AvgOfExpenseAtraction={AvgOfExpenseAtraction} AvgOfExpenseSleep={AvgOfExpenseSleep}
  AvgOfExpenseCasino={AvgOfExpenseCasino} AvgOfExpenseParty={AvgOfExpenseParty} SumOfExpenseAtraction={SumOfExpenseAtraction}
  SumOfExpenseSleep={SumOfExpenseSleep } SumOfExpenseDrugs={SumOfExpenseDrugs} SumOfExpenseFood={SumOfExpenseFood}
  SumOfExpenseCasino={SumOfExpenseCasino} SumOfExpenseParty={SumOfExpenseParty}/>
</Card> */}


    {boolean==true&&<GraphsBar Data={Data} DataPrecent={DataPrecent}/>}
      <Navigation pagNav={'budget'}/>
    </div>
  )
}
