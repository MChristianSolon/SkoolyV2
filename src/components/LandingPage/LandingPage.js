import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ButtonGroup from '@material-ui/core/ButtonGroup'

function LandingPage() {
    return (
        <Grid container>
            Landing Page
            <Grid item xs={12}>
            <ButtonGroup>
                <Button href="/stage" variant="contained" color="primary" size="large">Stage</Button>
                <Button variant="contained" color="secondary" size="large">Create</Button>
            </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default LandingPage
