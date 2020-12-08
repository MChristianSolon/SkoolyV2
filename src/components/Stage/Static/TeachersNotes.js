import React, {useEffect, useState, useContext} from 'react'
import Grid from '@material-ui/core/Grid'
import {CurrentTimeContext} from '../../Contexts/CurrentTime'


function TeachersNotes({videoTranscript}) {
    const [phrases, setPhrases] = useState([])
    const {globalCurrentTime} = useContext(CurrentTimeContext)
   
    useEffect(() => {
        let transcript = []; 
       
        for(let i = 0; i < videoTranscript.length; i++){
            let time = videoTranscript[i].getAttribute("start")
            transcript.push(
                <div key={Math.random()} style={{margin: '20px'}}>
                <Grid item xs={3} >
                    <b>{Math.round(time)} seconds</b>
                </Grid>
                  <Grid item xs={9} style={
                      globalCurrentTime >= Math.round(time) && globalCurrentTime < (Math.round(videoTranscript[i+1].getAttribute("start")))
                      ? {backgroundColor: 'yellow',} 
                      : {}
                      }>
                  {videoTranscript[i].textContent}
                </Grid>
                </div>   
            )
        }  
        setPhrases(transcript)
    },[videoTranscript, globalCurrentTime])
    return (
        <div style={{ textAlign: "left"}}>
            <b>Transcript</b>
            <h1>
            {globalCurrentTime}
            </h1>
            <Grid container direction="row" spacing={0} style={{height: '50vh', overflowY: 'scroll'}}>
                {phrases}
            </Grid>
        </div>
    )
}

export default TeachersNotes
