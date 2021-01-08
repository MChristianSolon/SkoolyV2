import React, {useEffect, useState, useContext} from 'react'
import Grid from '@material-ui/core/Grid'
import {CurrentTimeContext} from '../../Contexts/CurrentTime'
import Divider from '@material-ui/core/Divider'


function TeachersNotes({videoTranscript}) {
    const [phrases, setPhrases] = useState([])
    const {globalCurrentTime} = useContext(CurrentTimeContext)
   
    useEffect(() => {
        let transcript = []; 
       
        for(let i = 0; i < videoTranscript.length; i++){
            let time = videoTranscript[i].getAttribute("start")
            transcript.push(
                <Grid item xs={12} key={Math.random()}>
                    <Grid container>
                        <Grid item xs={2}>
                        <b>{Math.round(time)} seconds</b>
                        </Grid>
                        <Grid item xs={10} style={
                            globalCurrentTime >= Math.round(time) && globalCurrentTime < (Math.round(videoTranscript[i+1].getAttribute("start")))
                            ? {backgroundColor: 'yellow',} 
                            : {}
                            }>
                        {videoTranscript[i].textContent}
                        </Grid>
                    </Grid>
                </Grid>   
            )
        }  
        setPhrases(transcript)
    },[videoTranscript, globalCurrentTime])
    return (
        <div style={{ textAlign: "left"}}>
            <h3>Transcript</h3>
            <Divider/>
            <Grid container direction="row" spacing={3} style={{height: '50vh', overflowY: 'scroll'}}>
                {phrases}
            </Grid>
        </div>
    )
}

export default TeachersNotes
