import React, {useContext, useEffect, useState} from 'react'
import { SubLessonContext } from '../../../Contexts/SubLesson'
import Grid from '@material-ui/core/Grid'
import QuestionModal from './QuestionModal'

function SectionInfo({globalCurrentTime, roomId}) {
    const {currentSubLesson} = useContext(SubLessonContext)
    const [viewTime, setViewTime] = useState("")

    function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}
    useEffect(() => {
        setViewTime(() => {
            return fmtMSS(globalCurrentTime)
        })
    }, [globalCurrentTime])
    return (
        <Grid container spacing={2} direction="row">
            <Grid item xs={12}>
            <h3>
                {currentSubLesson}
            <b style={{border: '1px black solid', margin: '10px', padding: '10px'}}>
            {viewTime} minutes
            </b>
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
