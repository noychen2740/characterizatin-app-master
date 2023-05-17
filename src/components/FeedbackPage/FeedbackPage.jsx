import React, { useEffect, useState } from 'react'
import './FeedbackPage.css'
import { feedbackService } from '../../services/feedback.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import  jeep from '../../assets/jeep.jpg';
import TopOfAplication from '../TopOfAplication';
import Navigation from '../Navigation';



function FeedbackPage() {
  const [feedback, setFeedback] = useState(null);
  const { FeedbackKey } = useParams();
  const navigate = useNavigate();

  useEffect(() => { //טעינה של הפיידבק הספציפי לפי הקיי
    if (FeedbackKey) {
      loadFeedback();
    }
  }, []);

  const loadFeedback = async () => {  //טעינה של הפיידבק הספציפי לפי הקיי
    const data = await feedbackService.getById(FeedbackKey);
    setFeedback(data);
  };

  const remove = async (id) => { //מחיקה של הפיידבק הספציפי לפי הקיי
    console.log({ id });
    await feedbackService.remove(feedback.FeedbackKey);
    navigate('/feedbacks')
  };

  const submit = async () => { //הוספה של הפיידבק הספציפי לפי הקיי
    console.log();
    const res = await feedbackService.create(feedback)
  await  feedbackService.remove(feedback.FeedbackKey)
    navigate('/feedbacks')
  }
  return feedback ? ( //תצוגה של הפידבק הספציפי על המסך
    <div className='feedbackpage'>
      <TopOfAplication label={feedback.FeedbackTitle}  />
      {/* <div className='title'>יומן המסע שלי</div> */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    <div className="title"> {feedback.FeedbackTitle}</div>
                    <div>שם המדינה : {feedback.FeedbackCountry}</div>
                    <div>איזור במדינה : {feedback.FeedbackRegionOfTheCountry}</div>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    <div>תיאור מהמשתמש : {feedback.FeedbackDescription}</div>
                    <div>סוג הפיידבק : {feedback.KindOfFeedback}</div>
                    <div>נקודת ציון של הפיידבק : </div>
                    <div>FeedbackLongitude : {feedback.FeedbackLongitude}</div>
                    <br></br>
                    <div>FeedbackLatitude : {feedback.FeedbackLatitude}</div>
                    <div>{feedback.FeedbackPhoto}</div>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={submit} size="small">הוספת פידבק </Button>
                    <Button onClick={() => remove(feedback.FeedbackKey)} size="small">מחיקת פידבק </Button>
                  </CardActions>
                </Card>
                <Navigation></Navigation>
    </div>
  ) : <div className="loading">
    loading...
  </div>
}

export default FeedbackPage