import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const fieldsMapper = {
    0: {
        title: "AidCompName",
        image: "AidComplexesPhoto",
        description: "AidCompDescription",
        selector: "HOS"
    },
    1: {
        title: "TripsName",
        image: "TripsPhoto",
        description: "TripsDescription",
        selector: "T"
    },
    2: {
        title: "SleepingCompName",
        image: "SleepingComplexesPhoto",
        description: "SleepingCompDescription",
        selector: "S"
    },
    3: {
        title: "AttractionName",
        image: "AttractionPhoto",
        description: "AttractionDescription",
        selector: "A"
    }
}

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function OptionsCard({ tabIndex, item, index, selected }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { title, image, selector, description } = fieldsMapper[tabIndex];

    const itemSelector = `${selector}${index}`

    const isSelected = selected === `.${itemSelector}`

    return (
        <Card className={itemSelector} style={isSelected ? { backgroundColor: '#ececec' } : {}} sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        { }
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={item[title]}
            />
            <CardMedia
                component="img"
                height="194"
                image={item[image] || 'https://picsum.photos/200/300'}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">

                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>

                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{item[description]}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}