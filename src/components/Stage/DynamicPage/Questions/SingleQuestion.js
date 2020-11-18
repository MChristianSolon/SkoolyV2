import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


function SingleQuestion({text, commenter, answers}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [answersArr, setAnswersArr] = useState([])

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
            console.log(key + " -> " + answers[key]);
            newArr.push(
            <div key={key}>
              <b>Answer:</b> {key}  
          </div>
          )
        }
        setAnswersArr(newArr)
    }
    },[answers])

    return (
    <Grid item sm={6} xs={12}>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Reply</MenuItem>
        <MenuItem onClick={handleClose}>Expand</MenuItem>
        <MenuItem onClick={handleClose}>Save</MenuItem>
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
                subheader="5"
            />
                <CardContent>     
                {answersArr}
                </CardContent>
            </Card>
        </Grid>
    )
}

export default SingleQuestion
