import React from 'react'
import Grid from '@material-ui/core/Grid'
import CourseProgress from './CourseProgress'
import SubLessonsProgress from './SubLessonsProgress'
import Divider from '@material-ui/core/Divider'
function StageDrawer() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <CourseProgress />
            </Grid>
            <Grid item xs ={12}>
                <Divider /> 
            </Grid>
            <Grid item xs ={12}>            
                <SubLessonsProgress />
            </Grid>
        </Grid>
    )
}

export default StageDrawer
