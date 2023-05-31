import React, { useEffect, useState } from 'react';
import './Episodes.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { chapterService } from '../../services/chapter.service';
// import  jeep from '../../assets/jeep.jpg'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TopOfAplication from '../TopOfAplication';
import Navigation from '../Navigation';



function Episodes() {
  const navigate = useNavigate();

  const [episodes, setEpisodes] = useState([]);

  useEffect(() => { //טעינה של כל הפרקים
    loadEpisodes();
  }, []);

  const remove = async (id) => { //אפשרות למחיקת פרק לפי האי די שלו
    console.log({ id });
    await chapterService.remove(id);
    loadEpisodes();
  };

  const edit = (id) => { //אפשרות לעריכה פרק לפי האי די שלו
    console.log({ id });
    navigate(`/create-episode/${id}`);
  };

  const loadEpisodes = async () => { //טעינת כל הפרקים הקיימים
    const res = await chapterService.getAll();
  console.log('getting  episodes',res);
    setEpisodes(res);
  };

  return ( //תצוגת הפרקים במסך
    <div className='episodes-page center'>
      <TopOfAplication label='הפרקים שלי'  />
      {/* <div className='title'>יומן המסע שלי</div> */}
      <br></br>
      <br></br>
      <div className='episodes'>
        {episodes.map((e) => {
          return (
            <div key={e.NameOfChapter} className='episode'>
              <Card sx={{ maxWidth: 345 }}>
              <div className='episode-time'>
                <div className='episode-date'> {new Date(e.ChapterDate).toLocaleDateString('en-GB')} </div>
                <div className='episode-hour'>{e.ChapterTime}</div>
              </div>
      <CardMedia
        component="img"
      
        height="140"
        src={e.ChapterPictures}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        <div className='episode-title'>{e.NameOfChapter}</div>
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <div className='episode-desc'>{e.ChapterDescription.length > 20 ? e.ChapterDescription.substring(0, 20) + '...' : e.ChapterDescription}</div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button  onClick={() => edit(e.NameOfChapter)} size="small">עריכה</Button>
        <Button onClick={() => navigate(`/episode/${e.NameOfChapter}`)} size="small"> תצוגה</Button>
        <Button onClick={() => remove(e.NameOfChapter)} size="small"> מחיקה</Button>
      </CardActions>
    </Card>
    <br></br>
      <br></br>
            </div>
          );
        })}
      </div>
      <Navigation/>
    </div>
  );
}

export default Episodes;
