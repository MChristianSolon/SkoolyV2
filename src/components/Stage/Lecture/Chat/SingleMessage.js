import React from 'react'
import Grid from '@material-ui/core/Grid'
import PersonIcon from '@material-ui/icons/Person';
import {makeStyles} from '@material-ui/core/styles'
import "./Chat.css"

const useStyles = makeStyles({
    messagerIcon: {
        height: "12px"
    },
    messageLabel:{
        position: "relative",
        top: '10px',
        height: "15px",
        fontSize: "10px",
        backGround: "black"
    }
})

function SingleMessage({message}) {
    const classes = useStyles();
    return (
        <Grid container spacing={1}>
            <Grid item>
                <div>
                {message}
                </div>
            </Grid>
            <Grid item>
                <div className={classes.messageLabel}>
                    <PersonIcon className={classes.messagerIcon}/>Robyn
                </div>
            </Grid>
        </Grid>
    )
}

export default SingleMessage
