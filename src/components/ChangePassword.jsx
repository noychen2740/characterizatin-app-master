
import React from 'react'
import { useRef } from 'react'
import emailjs from "@emailjs/browser"
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
export default function ChangePassword() {
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
      };
    return (
    <section>
        <div className="App-login">
                <img className="App-logo" src="logo.png" alt="sad" />

            <form ref={form} onSubmit={sendEmail} 
            className="--form-control--card--flex-center --ir-colum">
                <input type="text"
                placeholder='שם פרטי' 
                name='user_name' required />
                <br />
                <br />
                <input type="email"
                placeholder='כתובת מייל איתה נירשמת' 
                name='user_email' required />
               <br />
               <br />

                <button type='submit' className='--btn-- btn-primary'>שלח אליי סיסמא חדשה</button>
            </form>

        </div>
    </section>
  )
}
