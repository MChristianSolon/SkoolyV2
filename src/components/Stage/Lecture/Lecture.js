import React from 'react'
import YouTube from 'react-youtube'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PeopleIcon from '@material-ui/icons/People';
import Chip from '@material-ui/core/Chip'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Chat from './Chat/Chat';
import Avatar from '@material-ui/core/Avatar'
import "./Lecture.css"

const useStyles = makeStyles({
    liveButton: {
        backgroundColor: "#ef5350",
        color: "white",
        flex: 1, 
        
    },
    liveIcon: {
        color: "white"
    },
    chips:{
        padding: '15px',
    },
    lockIcon:{
        position: 'relative',
        top: '5px',
        color: "blue"
    },
 
})

function Lecture() {
    const classes = useStyles();
    return (
            <Grid container direction="row" spacing={2} justify="space-between" className="lecture">
                <Grid item xs={12}>
                <YouTube videoId="2g811Eo7K8U" />
                </Grid>
                <Grid item md={2} xs={4}>
                <Chip icon={<FiberManualRecordIcon className={classes.liveIcon}/>} label="Live" className={classes.liveButton}/>
                </Grid>
                <Grid item md={2} xs={5}>
                    <Chip icon={<PeopleIcon />} label="24 Online" className={classes.chips}/>
                </Grid>
                <Grid item md={8} xs={12}>
                    <div style={{float: "right"}}>
                        <LockOpenIcon className={classes.lockIcon}/> Public Room
                    </div>
                </Grid>
                <Grid item md={12}>
                    <center>
                        <Avatar>C</Avatar>
                    </center>
                </Grid>
                <Grid item md={12} className="lecture__chat">
                        <Chat />
                </Grid>
            </Grid>    
    )
}

export default Lecture
