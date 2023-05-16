import React, { useEffect, useState } from 'react';
import './CreateEpisode.css';
import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useParams } from 'react-router-dom';
import { chapterService } from '../../services/chapter.service';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Card } from '@mui/material';
import TopOfAplication from '../TopOfAplication';
import Navigation from '../Navigation';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';



function CreateEpisode() {
  const [form, setForm] = useState();
  const [time, setTime] = useState();
  const [init, setInit] = useState(true);
  const { NameOfChapter } = useParams();
  const navigate = useNavigate();

  const submit = async (ev) => { //ממיר את התאריך לפורמט המתאים בדאטה בייס
    ev.preventDefault();
    form.ChapterDate = new Date(form.ChapterDate).toLocaleDateString('en-us')
    form.ChapterTime = formatAMPM(new Date(form.ChapterTime))
    if (NameOfChapter) {
      const res = await chapterService.update(form);
    } else {
      const res = await chapterService.create(form);
    }
    navigate('/episodes');
  };


  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    console.log({ hours, minutes });
    // var ampm = hours >= 12 ? 'pm' : 'am';
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;
    var strTime = hours + ':' + minutes;
    return strTime;
  }
  const handleChange = (ev) => { //לוקח את הפרמטרים ש/מזינים בפורם
    let { name, value } = ev.target;

    setForm({ ...form, [name]: value });
  };

  useEffect(() => { //טוען את הפרק לאחר ההוספה

    if (NameOfChapter) {

      loadEpisode();
    }
  }, []);

  useEffect(() => {
    if (form) {
      if (init) {
        const now = new Date()
        now.setHours(form.ChapterTime.split(':')[0])
        now.setMinutes(form.ChapterTime.split(':')[1])
        setTime(dayjs(now))
        setInit(false)

      }
    }
  }, [form])

  const loadEpisode = async () => {
    const data = await chapterService.getById(NameOfChapter);
    setForm(data);
  };
  return ( //היצירה של הפרק מבחינה ויזואלית
    <div className='create-episode' >
      <TopOfAplication label='יצירה-עדכון פרק' />
      <div className='container center'>
      <div className='container center'>
      <TopOfAplication label='יצירה-עדכון פרק'  />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
        <form onSubmit={submit} >
          <FormControl sx={{ m: 1, width: 'calc(100% - 16px)' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Title</InputLabel>
            <OutlinedInput
              onInput={handleChange}
              name='NameOfChapter'
              id="outlined-adornment-email"
              label="Title"
              value={form?.NameOfChapter||''}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 'calc(100% - 16px)' }} variant="outlined">
            <DatePicker
              label="Controlled picker"
              value={dayjs(form?.ChapterDate)}
              onChange={(ChapterDate) => setForm({ ...form, ChapterDate })}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 'calc(100% - 16px)' }} variant="outlined">
            <TimePicker
              label="Controlled picker"
              onChange={(ChapterTime) => setForm({ ...form, ChapterTime })}
              value={time}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 'calc(100% - 16px)' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">ChapterDescription</InputLabel>
            <OutlinedInput
              onInput={handleChange}
              name='ChapterDescription'
              id="outlined-adornment-email"
              label="Title"
              value={form?.ChapterDescription || ''}
            />
          </FormControl>
          <div className='input-container'>
            <br></br>
            <input className='imginput' type='file'></input>
          </div>
        </form>
        <div className='input-container-button'>
          <Button
            className='btn btn-create'
            variant='contained'
            onClick={submit}
            style={{ backgroundColor: '#598e89' }}
          >
            שמור פרק
          </Button>
        </div>
      </div>
      <Navigation></Navigation>
    </div>
    </div>
  );
};

export default CreateEpisode;
