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

  const [favoritess, setFavorites] = useState([]);

  useEffect(() => { //טעינה של כל הפרקים
    loadFavorites();
  }, []);

  const loadFavorites = async () => { //טעינת כל הפרקים הקיימים
    const res = await favoriteservice.Getall();
    console.log(res);
    setFavorites(res);
  };

  return ( //תצוגת הפרקים במסך
    <div className='episodes-page center'>
      <TopOfAplication label='המועדפים שלי' />
      {/* <div className='title'>יומן המסע שלי</div> */}
      <br></br>
      <br></br>
      <div className='Favoritesss'>
        {favoritess.map((favorites) => {
          return (
            <div className='episode2'>
              <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    src={jeep} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    <div className='Fav-title'>{favorites.TitelDTO} </div>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    <h1 className='FAv-desc'>
                    <p>{favorites.CountryNameDTO} </p>
                    <p>{favorites.UserFavouritesRegionOfTheCountryDTO}</p>
                    <p> {favorites.DescriptionDTO}</p>
                    </h1>
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Button onClick={() => navigate(`/favorites/${favorites.FavouritesKey}`)} size="small"> תצוגה</Button>
                </CardActions>
                </Card>
              <br></br>
              <br></br>
            </div>
          );
        })}
      </div>
      <Navigation />
    </div>
  );
}

export default Favorites;
