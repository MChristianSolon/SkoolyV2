import React, {useState} from 'react'
import CircularProgressWithLabel from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import './CourseProgress.css'

function CourseProgress() {
    const [courseProgress] = useState(90)

    return (
        <Grid container className="course_progress" spacing={2}>
            <Grid item xs={12}>
                <center>
                <h1 style={{color: '#616161'}}>Linear Algebra</h1>
                <Box position="relative" display="inline-flex" className="course_progress_circular">
                <CircularProgressWithLabel value={courseProgress} variant="static"/> 
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
                    <LinearProgress variant="determinate" value={80} color="primary" style={{width: '80%'}}/>
                </center>
            </Grid>
        </Grid>
    )
}

export default CourseProgress
