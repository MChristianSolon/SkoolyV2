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
import OpenWithIcon from '@material-ui/icons/OpenWith';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import ReplyIcon from '@material-ui/icons/Reply';
import { SubLessonContext } from '../../../Contexts/SubLesson'
import { db, store } from '../../../../Firebase/Firebase'





function SingleQuestion({text, commenter, answers, roomId, questionTime}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [answersArr, setAnswersArr] = useState([])
    const {currentSubLesson} = useContext(SubLessonContext)

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
            <div key={key}>
              <b>Answer:</b> {key}  
          </div>
          )
        }
        setAnswersArr(newArr)
    }
    },[answers])

    const handleDeleteQuestion = () => {
      const SubLessons = `SubLessons.${currentSubLesson}.times.${questionTime}.questions.${text}`
       db.collection('courses').doc(`${roomId}`).update({
         [SubLessons] : store.FieldValue.delete()
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
        <MenuItem onClick={handleDeleteQuestion}>
            <ReplyIcon />Reply
          </MenuItem>
          <MenuItem onClick={handleDeleteQuestion}>
            <OpenWithIcon /> Expand
          </MenuItem>
          <MenuItem onClick={handleDeleteQuestion}>
            <TurnedInNotIcon />Save
          </MenuItem>
        <MenuItem onClick={handleDeleteQuestion}>
            <DeleteIcon />Delete
          </MenuItem>
      </Menu>
     
            <Card className="singleQuestion">
            <CardHeader
                avatar={
                <Avatar aria-label="recipe">
                    {commenter ? commenter[0] : 'R'}
                </Avatar>
                }
                action={
                <IconButton aria-label="settings" onClick={handleClick}>
                          <MoreVertIcon />
                </IconButton>
                }
                title={text ? text:  "No Question" }
                subheader={questionTime}
            />
                <CardContent>     
                {answersArr}
                </CardContent>
            </Card>
        </Grid>
    )
}

export default SingleQuestion
