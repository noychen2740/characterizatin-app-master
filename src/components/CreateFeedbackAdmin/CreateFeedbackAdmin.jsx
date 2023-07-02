import React, { useEffect, useState } from 'react';
import './CreateFeedbackAdmin.css';
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { feedbackService } from '../../services/feedback.service';
import { TextField } from '@mui/material';
import TopOfAplication from '../TopOfAplication';
import Navigation from '../Navigation';
import NavigationAdmin from '../NavigationAdmin';


function CreateFeedbackAdmin() {
  const [form, setForm] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const submit = async (ev) => { //לאחר ההוספה של הפרק העמוד מובל לעמוד תודה למשתמש
    ev.preventDefault();
    const res = await feedbackService.createfromuser(form);
    navigate('/ThanksPage');
  };

  const handleChange = (ev) => { //לוקח את הפרמטרים מהטופס לדאטה בייס
    let { name, value } = ev.target;

    setForm({ ...form, [name]: value }); 
  };

  return ( //יצירה של הפידבק
    <div className='create-episode'>
      <div className='container center'>
      <TopOfAplication label='הוספת המלצה חדשה'  />
      <br></br>
      <br></br>
        <form onSubmit={submit}>       
          <div className='input-container'>
          <FormControl sx={{ m: 1, width: 'calc(100% - 16px)',height: 'calc(90% - 16px)'}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">כותרת</InputLabel>
            <OutlinedInput
                cols='50'
                rows='1'
                onInput={handleChange}
                name='FeedbackTitle'
                id="fullWidth"
                label="Title"
                value={form?.FeedbackTitle} 
              />
          </FormControl>
          </div>
          <div className='input-container'>
          <FormControl sx={{ m: 1, width: 'calc(100% - 16px)',height: 'calc(90% - 16px)'}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">תיאור</InputLabel>
            <OutlinedInput
                cols='50'
                rows='3'
                onInput={handleChange}
                name='FeedbackDescription'
                id="fullWidth"
                label="Description"
                value={form?.FeedbackDescription}
                multiline={true} 
              />
          </FormControl>
          </div>
          <div className='input-container'>
          <FormControl sx={{ m: 1, width: 'calc(100% - 16px)',height: 'calc(90% - 16px)'}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">שם המדינה</InputLabel>
            <OutlinedInput
                cols='50'
                rows='1'
                onInput={handleChange}
                name='FeedbackCountry'
                id="fullWidth"
                label="Country"
                value={form?.FeedbackCountry}
              />
          </FormControl>
          </div>
          <div className='input-container'>
          <FormControl sx={{ m: 1, width: 'calc(100% - 16px)',height: 'calc(90% - 16px)'}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">איזור במדינה  </InputLabel>
            <OutlinedInput
                cols='50'
                rows='1'
                onInput={handleChange}
                name='FeedbackRegionOfTheCountry'
                id="fullWidth"
                label="RegionOfTheCountry"
                value={form?.FeedbackRegionOfTheCountry} 
              />
          </FormControl>
          </div>
          <FormControl fullWidth>
          <p className='pdiv'>לחץ כאן לבחירת סוג ההמלצה</p>
          <label>סוג</label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form?.KindOfFeedback}
              label="Age"
              name='KindOfFeedback'
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value={"Attractions"}>Attractions</MenuItem>
              <MenuItem value={"Trips"}>Trips</MenuItem>
              <MenuItem value={"SleepingComplexes"}>SleepingComplexes</MenuItem>
              <MenuItem value={"AidComplexes"}>AidComplexes</MenuItem>
            </Select>
          </FormControl>
          <div className="seperator"></div>
          <div className='input-container'>
          <FormControl sx={{ m: 1, width: 'calc(100% - 16px)',height: 'calc(90% - 16px)'}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">נקודת ציון קו אורך </InputLabel>
            <OutlinedInput
                cols='50'
                rows='1'
                onInput={handleChange}
                name='FeedbackLongitude'
                id="fullWidth"
                label="Longitude"
                value={form?.FeedbackLongitude}
              />
          </FormControl>
          </div>
          <div className='input-container'>
          <FormControl sx={{ m: 1, width: 'calc(100% - 16px)',height: 'calc(90% - 16px)'}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">נקודת ציון קו רוחב </InputLabel>
            <OutlinedInput
                cols='50'
                rows='1'
                onInput={handleChange}
                name='FeedbackLatitude'
                id="fullWidth"
                label="Latitude"
                value={form?.FeedbackLatitude}
              />
          </FormControl>
          </div>
          <div className='input-container'>
            <p className='pdiv'>להוספת תמונה לחץ כאן</p>
          <input className='imginput' type='file'></input>
          </div>
          <div className='input-container-button'>
          <Button
            className='btn btn-create2'
            variant='contained'
            style={{backgroundColor:'#598e89'}}
            onClick={submit}
          >
            תוסיפו לאפליקציה
          </Button>
          </div>
          <br></br>
          <br></br>
        </form>
      </div>
      <NavigationAdmin pagNav={'recommendation'}/>
    </div>
  );
}

export default CreateFeedbackAdmin;
