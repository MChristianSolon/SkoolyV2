import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { Link } from 'react-router-dom'


function LandingPage() {
    return (
        <Grid container>
            Landing Page
            <Grid item xs={12}>
                <Link to={`/stage/?host=${"CHRIS"}&room=${"123"}`}>
                    Stage Again lol
                </Link>
            <ButtonGroup>
                 <Button href={`/stage/?name=${"CHRIS"}&room=${"123"}`} variant="contained" color="primary" size="large">Stage</Button>
                 <Button variant="contained" color="secondary" size="large">Create</Button>
            </ButtonGroup>
            </Grid>
        </Grid>
    )
}

export default LandingPage
