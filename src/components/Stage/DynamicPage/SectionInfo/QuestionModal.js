import React, {useState, useContext} from 'react';
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import {db, timestamp} from '../../../../Firebase/Firebase'
import {CurrentUserContext} from '../../../Contexts/CurrentUser'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'

export default function RecipeReviewCard({currentSubLesson, globalCurrentTime, roomId}) {
  const [question, setQuestion] = useState("")
  const {currentUser }= useContext(CurrentUserContext)

  const handleSubmitQuestion = (event) => {
      event.preventDefault()
      const SubLessons = `SubLessons.${currentSubLesson}.times.${globalCurrentTime}.questions`
      const random = Math.round(Math.random() * 100000)
       db.collection('courses').doc(`${roomId}`).update({
           [`${SubLessons}.${random}`] : {
              question,
              time: timestamp(),
              user: currentUser.name,
              photo: currentUser.photo
           }
      })
      setQuestion("")
  }

  return (
    <Grid container spacing={4}>
        <Grid item xs={12}>
            <form onSubmit={handleSubmitQuestion}>
              <Grid container spacing={1} alignItems="flex-end">
              <Grid item md={2}>
              </Grid>
              <Avatar src={currentUser.photo} alt={currentUser.name} />
              <Grid item md={8}>
              <TextField placeholder="Start a Discussion..." 
                value={question} 
                onChange={event => setQuestion(event.target.value)}
                style={{width: '80%'}}
                />
              </Grid>
              <Grid item xs={12}>
              <Button type="submit" variant="contained" style={{display: 'none'}}>Submit</Button>
              </Grid>
            </Grid>
            </form>
        </Grid>
      </Grid>
  );
}
