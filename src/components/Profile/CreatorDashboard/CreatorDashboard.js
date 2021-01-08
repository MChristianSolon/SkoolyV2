import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

function CreatorDashboard({setDashboard}) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button color="primary" size="large" variant="outlined" onClick={() => setDashboard('user')}>Creator Dashboard</Button>
            </Grid> 
            <Grid item xs={12}>
                <h1>My Courses</h1>
            </Grid>
        </Grid>
    )
}

export default CreatorDashboard
