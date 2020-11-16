import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


function SingleQuestion() {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

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
                    R
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                       <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                          <MoreVertIcon />
                        </Button>
                </IconButton>
                }
                title="Why does this do that again?"
                subheader="22:05"
            />
                <CardContent>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default SingleQuestion
