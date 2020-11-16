import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Selection from './Selection'
import './Static.css'
import TeachersNotes from './TeachersNotes'


function Static() {
    return (
        <Grid container >
            <Grid item xs={12} >
                <Card variant="outlined" className="static">
                    <CardContent >
                      <Selection />                  
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} >
                <Card variant="outlined" className="static">
                    <CardContent >
                      <TeachersNotes />                  
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Static
