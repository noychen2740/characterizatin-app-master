import React, { useEffect, useState } from 'react';
import './Favorites.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { chapterService } from '../../services/chapter.service';
import jeep from '../../assets/jeep.jpg'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TopOfAplication from '../TopOfAplication';
import Navigation from '../Navigation';
import { favoriteservice } from '../../services/Favorites.service';



function Favorites() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => { //טעינה של כל הפרקים
    loadFavorites();
  }, []);

  const loadFavorites = async () => { //טעינת כל הפרקים הקיימים
    const res = await favoriteservice.Getall();
    setFavorites(res);
  };

  return ( //תצוגת הפרקים במסך
    <div className='episodes-page center'>
      <TopOfAplication label='המעועדפים שלי' />
      {/* <div className='title'>יומן המסע שלי</div> */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className='episodes'>
        {favorites.map((f) => {
          return (
            <div className='episode'>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <div className='episode-title'>{f.CountryName}</div>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <div className='episode-desc'>{f.UserFavouritesRegionOfTheCountry}</div>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => navigate(`/favorites/${f.FavouritesKey}`)} size="small"> תצוגה</Button>
                </CardActions>
              </Card>
              <br></br>
              <br></br>
            </div>
          );
        })}
      </div>
      <br></br>
      <br></br>
      <Navigation />
    </div>
  );
}

export default Favorites;
