import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ButtonGroup from '@material-ui/core/ButtonGroup'



function LandingPage() {
    return (
        <Grid container>
            <Grid item xs={12}>
            <ButtonGroup>
                 <Button href={`/stage/?host=${"CHRIS"}&room=${"123"}`} variant="contained" color="primary" size="large">Stage</Button>
                 <Button href={`/create`} variant="contained" color="secondary" size="large">Create</Button>
            </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default LandingPage
