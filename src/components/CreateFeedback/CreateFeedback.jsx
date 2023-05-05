import React, { useEffect, useState } from 'react';
import './CreateFeedback.css';
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { feedbackService } from '../../services/feedback.service';
import { TextField } from '@mui/material';
import TopOfAplication from '../TopOfAplication';
import Navigation from '../Navigation';


function CreateFeedback() {
  const [form, setForm] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const submit = async (ev) => { //לאחר ההוספה של הפרק העמוד מובל לעמוד תודה למשתמש
    ev.preventDefault();
    const res = await feedbackService.createfromuser(form);
    navigate('/thanks');
  };

  const handleChange = (ev) => { //לוקח את הפרמטרים מהטופס לדאטה בייס
    let { name, value } = ev.target;

    setForm({ ...form, [name]: value }); 
  };

  return ( //יצירה של הפידבק
    <div className='create-episode'>
      <div className='container center'>
      <TopOfAplication label='יצירת פיידבק חדש'  />
      {/* <div className='title'>יומן המסע שלי</div> */}
      <br></br>
      <br></br>
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
                // multiline={true} 
              />
          </FormControl>
            {/* <label>כותרת</label>
            <br></br>
            <TextField name='FeedbackTitle' fullWidth id="fullWidth" cols='50'
              rows='2' onInput={handleChange}
              value={form?.FeedbackTitle} /> */}
          </div>
          <div className='input-container'>
          <FormControl sx={{ m: 1, width: 'calc(100% - 16px)',height: 'calc(90% - 16px)'}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">תיאור</InputLabel>
            <OutlinedInput
                cols='50'
                rows='2'
                onInput={handleChange}
                name='FeedbackDescription'
                id="fullWidth"
                label="Description"
                value={form?.FeedbackDescription}
                multiline={true} 
              />
          </FormControl>
            {/* <label>תיאור</label>
            <br></br>
            <TextField name='FeedbackDescription' fullWidth id="fullWidth" cols='50'
              rows='3' onInput={handleChange}    multiline={true} 
              value={form?.FeedbackDescription} /> */}
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
                // multiline={true} 
              />
          </FormControl>


            {/* <label>שם המדינה</label>
            <br></br>
            <TextField name='FeedbackCountry' fullWidth id="fullWidth" cols='50'
              rows='10' onInput={handleChange}
              value={form?.FeedbackCountry} /> */}
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
                // multiline={true} 
              />
          </FormControl>

            
            {/* <label>איזור במדינה </label>
            <br></br>
            <TextField name='FeedbackRegionOfTheCountry' fullWidth id="fullWidth" cols='50'
              rows='10' onInput={handleChange}
              value={form?.FeedbackRegionOfTheCountry} /> */}
          </div>
          <FormControl fullWidth>
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
            <InputLabel htmlFor="outlined-adornment-email">נקודת ציון lon </InputLabel>
            <OutlinedInput
                cols='50'
                rows='1'
                onInput={handleChange}
                name='FeedbackLongitude'
                id="fullWidth"
                label="Longitude"
                value={form?.FeedbackLongitude}
                // multiline={true} 
              />
          </FormControl>


            {/* <label>נקודת ציון </label>
            <br></br>
            <TextField name='FeedbackLongitude' fullWidth id="fullWidth" cols='50'
              rows='10' onInput={handleChange}
              value={form?.FeedbackLongitude} /> */}
          </div>
          <div className='input-container'>
          <FormControl sx={{ m: 1, width: 'calc(100% - 16px)',height: 'calc(90% - 16px)'}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">נקודת ציון lat </InputLabel>
            <OutlinedInput
                cols='50'
                rows='1'
                onInput={handleChange}
                name='FeedbackLatitude'
                id="fullWidth"
                label="Latitude"
                value={form?.FeedbackLatitude}
                // multiline={true} 
              />
          </FormControl>


            {/* <label>נקודות ציון</label>
            <br></br>
            <TextField name='FeedbackLatitude' fullWidth id="fullWidth" cols='50'
              rows='10' onInput={handleChange}
              value={form?.FeedbackLatitude} /> */}
          </div>
          <div className='input-container-button'>
          <Button
            className='btn btn-create'
            variant='contained'
            style={{backgroundColor:'#598e89'}}
            onClick={submit}
          >
            שמור פידבק
          </Button>
          </div>
          <br></br>
          <br></br>
        </form>
      </div>
      <Navigation></Navigation>
    </div>
  );
}

export default CreateFeedback;
