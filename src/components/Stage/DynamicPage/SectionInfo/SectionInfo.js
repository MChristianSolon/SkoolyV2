import React, {useContext, useEffect, useState} from 'react'
import { SubLessonContext } from '../../../Contexts/SubLesson'
import Grid from '@material-ui/core/Grid'
import QuestionModal from './QuestionModal'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';  
import Button from '@material-ui/core/Button'
import {RoomDataContext} from '../../../Contexts/RoomDataContext'
import {CurrentTimeContext} from '../../../Contexts/CurrentTime'

function SectionInfo({globalCurrentTime, roomId}) {
    const {currentSubLesson} = useContext(SubLessonContext)
    const {globalRoomData} = useContext(RoomDataContext)
    const {setGlobalCurrentTime} = useContext(CurrentTimeContext)
    const [viewTime, setViewTime] = useState("")
    const [anchorEl, setAnchorEl] = useState(null);

    function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}
    useEffect(() => {
        setViewTime(() => {
            return fmtMSS(globalCurrentTime)
        })
    }, [globalCurrentTime])

    const handleTraverseTime = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(currentSubLesson)
    }

    const handleClose = () => {
        setAnchorEl(null);
      };
    
    const handleChangeTime = (time) => {
        setGlobalCurrentTime(time)
        setAnchorEl(null)
    }
    return (
        <Grid container spacing={2} direction="row">
            <Grid item xs={12}>
            <h3>
                {currentSubLesson}
            <Button variant="contained" onClick={handleTraverseTime} style={{marginLeft:'20px'}}>
                <b>
                {viewTime} minutes
                </b>
            </Button>
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{overflowY: 'scroll', maxHeight: '47%'}}
            >
            {Object.keys(globalRoomData[currentSubLesson].times).map(key => {
            return <MenuItem key={key} onClick={() => handleChangeTime(key)} style={{width: '8vw'}}>
                    <Button variant="contained">
                      {key} Seconds
                    </Button>
                </MenuItem>
            })}
            </Menu>
            </h3>         
            </Grid>
            <Grid item xs={6}>     
            </Grid>
            <Grid item xs={12}>
                <QuestionModal roomId={roomId} currentSubLesson={currentSubLesson} globalCurrentTime={globalCurrentTime}/>
            </Grid>
        </Grid>
      
    )
}

export default SectionInfo
