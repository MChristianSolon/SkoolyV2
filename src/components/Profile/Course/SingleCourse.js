import React from 'react'
import CircularProgressWithLabel from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

function SingleCourse({courseName, progress, room}) {

    return (
        <Grid container spacing={2}>
        <Grid item xs={12}> 
            <center>
            <Box position="relative" display="inline-flex" className="course_progress_circular">
            <CircularProgressWithLabel value={progress ? progress: 1} variant="static" color="primary" size={125}/> 
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
            <Typography variant="caption" component="div" color="textSecondary">{`${progress ? progress: 0}%`}</Typography>
                </Box>
                 </Box>
            </center>
        </Grid>
        <Grid item xs={12}>
            <center>
            <p style={{color: '#616161'}}>{courseName}</p>
                <LinearProgress variant="determinate" value={progress ? progress: 1} color="primary" style={{width: '5vw'}}/>
            </center>
        </Grid>
        <Grid item xs={12}>
                <Button href={`/stage/?host=${room.host}&room=${room.room}`} variant="outlined" color="primary" size="small">View Course</Button>
        </Grid>
    </Grid>
    )
}

export default SingleCourse
