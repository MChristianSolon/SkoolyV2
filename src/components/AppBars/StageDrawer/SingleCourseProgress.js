import React, {useState, useEffect} from 'react'
import CircularProgressWithLabel from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import './CourseProgress.css'

function SingleCourseProgress({SubLessonTitle, percent}) {
    const [courseProgress, setCourseProgress] = useState(1)

    useEffect(() => {
      if(percent){
         setCourseProgress(percent)
      }
    }, [percent])

    return (
        <Grid container className="course_progress" spacing={2} style={SubLessonTitle === 'room' ?{display: 'none'} : {marginBottom: '10px'}}>
            <Grid item xs={12}> 
                <center>
                <h3 style={{color: '#616161'}}>{SubLessonTitle}</h3>
                <Box position="relative" display="inline-flex" className="course_progress_circular">
                <CircularProgressWithLabel value={courseProgress} variant="static" color="secondary"/> 
                    <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                courseProgress,
                )}%`}</Typography>
                    </Box>
                     </Box>
                </center>
            </Grid>
            <Grid item xs={12}>
                <center>
                    <LinearProgress variant="determinate" value={courseProgress} color="secondary" style={{width: '80%'}}/>
                </center>
            </Grid>
        </Grid>
    )
}

export default SingleCourseProgress
