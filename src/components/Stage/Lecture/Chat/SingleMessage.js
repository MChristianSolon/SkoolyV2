import React from 'react'
import Grid from '@material-ui/core/Grid'
import PersonIcon from '@material-ui/icons/Person';
import {makeStyles} from '@material-ui/core/styles'
import "./Chat.css"


const useStyles = makeStyles({
    message: {
        marginTop: '10px'
    },
    messagerIcon: {
        height: "12px"
    },
    messageLabel:{
        position: "relative",
        top: '3.5px',
        height: "15px",
        fontSize: "10px",
        color: 'blue'
    }
})

function SingleMessage({text, username}) {
    const classes = useStyles();
    return (
        <Grid container className={classes.message}>
            <Grid item>
                <div>
                {text}
                </div>
            </Grid>
            <Grid item>
                <div className={classes.messageLabel}>
                    <PersonIcon className={classes.messagerIcon}/>{username}
                </div>
            </Grid>
        </Grid>
    )
}

export default SingleMessage
