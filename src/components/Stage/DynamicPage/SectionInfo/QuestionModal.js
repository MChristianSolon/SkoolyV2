import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateIcon from '@material-ui/icons/Create'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import {db} from '../../../../Firebase/Firebase'


const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    position: 'relative',
    left: 20,
    top: 5,
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

}));

export default function RecipeReviewCard({currentSubLesson, globalCurrentTime, roomId}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [question, setQuestion] = useState("")

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleSubmitQuestion = (event) => {
      event.preventDefault()
      const SubLessons = `SubLessons.${currentSubLesson}.times.${globalCurrentTime}.questions.${question}.commenter`
   
       db.collection('courses').doc(`${roomId}`).update({
           [SubLessons] : "cry"
      })
      setQuestion("")
  }

  return (
    <Grid container spacing={4}>
        <Grid item md={6} xs={6} s={6}>
            <Button variant="contained" color="primary" startIcon={<CreateIcon />} onClick={handleExpandClick}>
                Ask A Question
            </Button>
            <ExpandMoreIcon  className={clsx(classes.expand, {[classes.expandOpen]: expanded, })}/>
        </Grid>
        <Grid item xs={12}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmitQuestion}>
                    <TextField placeholder="Enter Text Here" value={question} onChange={event => setQuestion(event.target.value)}/>
                    <button type="submit" style={{display: 'none'}} />
                    </form>
                </CardContent>
            </Card>  
        </Collapse>
        </Grid>
      </Grid>
  );
}
