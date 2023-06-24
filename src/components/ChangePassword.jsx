
import React from 'react'
import { useRef } from 'react'
import emailjs from "@emailjs/browser"
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getEnv } from '../utils/env';
import TopOfAplication from './TopOfAplication';

export default function ChangePassword() {
    const nav = useNavigate();
    const [email, setEmail] = React.useState('');

    const form =useRef()

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_ahyodaa', 
        'template_l0astq8', form.current, 'TwAIolWQxjj10290K')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
        e.target.reset()
        console.log(email)
       
        const apiUrl = getEnv() + '/users/putemail/password/?email='
        fetch(apiUrl+email,
          {
            method: 'PUT',
            body: JSON.stringify('123456'),
            headers: new Headers({
              'Content-Type': 'application/json; charset=UTF-8',
              'Accept': 'application/json; charset=UTF-8',
            })

          })
          .then(response => {
            console.log('response= ', response);
            console.log('response statuse=', response.status);
            console.log('response.ok=', response.ok)
          },
            (error) => {
              console.log("err post=", error);
            });
        nav('/')
      };
    return (
        <>              
        <TopOfAplication label='שכחתי סיסמא' />
    <section>
        <div className="App-login">
                <img className="App-logo" src="forgetPassword.jpg" alt="sad" />

            <form ref={form} onSubmit={sendEmail} 
            className="--form-control--card--flex-center --ir-colum">
                <input type="text"
                placeholder='שם פרטי' 
                name='user_name' required />
                <br />
                <br />
                <input type="email"
                placeholder='כתובת מייל איתה נירשמת' 
                name='user_email' required onChange={(event) => { setEmail(event.target.value) }} />
               <br />
               <br />

                <button type='submit' className='--btn-- btn-primary' >שלח אליי סיסמא חדשה</button>
            </form>

        </div>
    </section>
    </>
  )
}
