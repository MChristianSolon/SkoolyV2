import React, {useEffect, useState, useContext} from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import ReplyIcon from '@material-ui/icons/Reply';
import { SubLessonContext } from '../../../Contexts/SubLesson'
import { db, store, timestamp } from '../../../../Firebase/Firebase'
import ExpandQuestion from './ExpandedQuestion/ExpandedQuestion'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import {CurrentUserContext} from '../../../Contexts/CurrentUser'

function SingleQuestion({text, commenter, answers, roomId, questionTime, questionKey, photo}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [answersArr, setAnswersArr] = useState([])
    const [response, setResponse] =  useState("")
    const {currentSubLesson} = useContext(SubLessonContext)
    const {currentUser} = useContext(CurrentUserContext)

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(() => {
      const newArr = []
      for (var key in answers) {
        if (answers.hasOwnProperty(key)) {
            newArr.push(
            <div key={key} style={{padding: '5%'}}>
              <b>Answer:</b> {answers[key].reply}  
          </div>
          )
        }
        setAnswersArr(newArr)
    }
  },[answers])
  
      const handleDeleteQuestion = () => {
        const SubLessons = `SubLessons.${currentSubLesson}.times.${questionTime}.questions.${questionKey}`
         db.collection('courses').doc(`${roomId}`).update({
           [SubLessons] : store.FieldValue.delete()
         })
      }

      const handleResponse = (event) => {
        if(event){
          event.preventDefault()
        }
        const SubLessons = `SubLessons.${currentSubLesson}.times.${questionTime}.questions.${questionKey}.replies.${Math.round(Math.random() * 100000)}`
   
       db.collection('courses').doc(`${roomId}`).update({
           [SubLessons] : {
               user: currentUser,
               reply: response,
               time: timestamp()
           }
      })
 
      }

    return (
    <Grid item sm={6} xs={12}>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          <MenuItem onClick={handleClose}>
            <ExpandQuestion questionText={text} commenter={commenter} responses={answers} replyObj={{setResponse, response, handleResponse}}/>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <TurnedInNotIcon />Save
          </MenuItem>
        <MenuItem onClick={handleDeleteQuestion}>
            <DeleteIcon />Delete
          </MenuItem>
      </Menu>
           
            <Card className="singleQuestion" style={{position:'relative', maxHeight: '100%'}}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" src={photo}>
                    {commenter ? commenter[0] : 'R'}
                </Avatar>
                }
                action={
                <IconButton aria-label="settings" onClick={handleClick}>
                          <MoreVertIcon />
                </IconButton>
                }
                title={text ? text:  "No Question" }
                subheader={`${questionTime} seconds`}
            />
                <CardContent className="answers_Arr"> 
                  <div  style={{height: '200px'}}>
                  {answersArr}  
                  </div>    
                <form onSubmit={handleResponse}>
                  <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                      <ReplyIcon />
                    </InputAdornment>
                    ),
                  }}
                  value={response}
                  onChange = {(e) => setResponse(e.target.value) }
                  style={{position:'absolute', bottom: '10%', left:'20%'}}
                  aria-label="minimum height" 
                  rowsmin={3} 
                  placeholder="Reply To Comment" />
                </form>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default SingleQuestion
