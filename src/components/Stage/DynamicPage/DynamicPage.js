import React, {useContext} from 'react'
import Grid from '@material-ui/core/Grid'
import BonusMaterial from './BonusMaterial/BonusMaterial'
import Questions from './Questions/Questions'
import SectionInfo from './SectionInfo/SectionInfo'
import { CurrentTimeContext } from '../../Contexts/CurrentTime'
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider'
import './DynamicPage.css'


function DynamicPage({roomData, roomId}) {
    const {globalCurrentTime} = useContext(CurrentTimeContext)
    if(roomData.times){
        return (
                 <Grid container className="dynamicPage" >
                    <Grid item md={12}>
                        <SectionInfo globalCurrentTime={globalCurrentTime} roomId={roomId}/>
                        <Divider />
                        <Questions roomId={roomId} questions={roomData.times[globalCurrentTime] ? roomData.times : ""}/>
                     </Grid>
                     <Grid item md={12} xs={12}>
                         <BonusMaterial static_content={roomData.times[globalCurrentTime] ? roomData.times[globalCurrentTime].time_static_content : ""}/>
                     </Grid>
                 </Grid>
        )
    }
    return <CircularProgress color="secondary" />; 
}

export default DynamicPage
