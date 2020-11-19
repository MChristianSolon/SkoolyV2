import React, {useEffect, useContext, useState} from 'react'
import YouTube from 'react-youtube'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PeopleIcon from '@material-ui/icons/People';
import Chip from '@material-ui/core/Chip'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Chat from './Chat/Chat';
import Avatar from '@material-ui/core/Avatar'
import {db} from '../../../Firebase/Firebase'
import "./Lecture.css"
import { CurrentTimeContext } from '../../Contexts/CurrentTime';

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
    let contextPlaying

function Lecture({host, room, course_name}) {
    const classes = useStyles();
    const [videoEvent, setVideoEvent] = useState(null)
    const {setGlobalCurrentTime} = useContext(CurrentTimeContext)
    const [isPlaying, setIsPlaying] = useState(false)


    //Getting Room Data
    useEffect(() => {
       db.collection('users').doc(`t26xMhImYWBNNSVjNPJi`).onSnapshot(doc => {
           const roomData = doc.data()
           setGlobalCurrentTime(
                roomData["courses"][`Linear Algebra`].SubLessons[`Matrices`][`Adding Matrices`].currentTime
            )
       
       })
    }, [setGlobalCurrentTime])

    const handleTimeChange = (event) => {
            const roundedTime = Math.round(event.target.getCurrentTime())
            db.collection('users').doc(`t26xMhImYWBNNSVjNPJi`).update({
                "courses.Linear Algebra.SubLessons.Matrices.Adding Matrices.currentTime" : `${roundedTime}`   
            })
            setGlobalCurrentTime(roundedTime)   
    }
    
    //Live Counter
    const handleLiveCount = (event) => {
        setVideoEvent(event)
        setIsPlaying(true)
        contextPlaying=true
    }
    
    useEffect(() => {
        if(videoEvent && isPlaying){
          const refreshTime = setInterval(function()
            { if(contextPlaying === true){ 
                setGlobalCurrentTime(Math.floor(videoEvent.target.getCurrentTime()))
            }else{
                clearInterval(refreshTime)
            }   
            }, 1000);
        }
     
    },[videoEvent, isPlaying, setGlobalCurrentTime])

    const handlePause = () => {
        setIsPlaying(false)
        contextPlaying = false
    }
    const opts = {
        height: '390',
        width: '450',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },  
      };
    return (
            <Grid container direction="row" spacing={2} justify="space-between" className="lecture">
                <Grid item xs={12}>
                <YouTube videoId="PjStfWnfDVI" onStateChange={handleTimeChange} opts={opts} onPlay={handleLiveCount} onPause={handlePause}/>
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
                        {course_name}
                    </center>
                </Grid>
                <Grid item md={12} className="lecture__chat" style={{maxHeight: '20vh'}}>
                        <Chat host={host} room={room}/>
                </Grid>
            </Grid>    
    )
}

export default Lecture
