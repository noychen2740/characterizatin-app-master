import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function OptionsCom(props) {
  const [value, setValue] = React.useState(3);
  const [dataCard, setDataCard]=React.useState();
  const renderCard=(value)=>{
    setDataCard(value)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box  sx={{maxWidth: { xs: 330 }, bgcolor: 'background.paper' ,mb:5} }>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab   label="חירום" onClick={()=>{renderCard("חירום")}} />
        <Tab   label="טיולים" onClick={()=>{renderCard("טיולים")}} />
        <Tab   label="הוסטלים" onClick={()=>{renderCard("הוסטלים")}} />
        <Tab   label="אטרקציות" onClick={()=>{renderCard("אטרקציות")}} />
      </Tabs>
      <Box>
        <h3>  {dataCard} ב{props.countryName}</h3>
        <h3 style={{color:'red'}}>  {dataCard} ב{props.countryName}</h3>
        <h3 style={{color:'green'}}> {dataCard} ב{props.countryName}</h3>
        <h3 style={{color:'blue'}}>  {dataCard} ב{props.countryName}</h3>
        <h3 style={{color:'pink'}}>  {dataCard} ב{props.countryName}</h3>

      </Box>
    </Box>
  );
}