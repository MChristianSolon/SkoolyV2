import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Lecture from './Lecture/Lecture'
import DynamicPage from './DynamicPage/DynamicPage'
import Static from './Static/Static'
import OnlineUsers from './OnlineUsers/OnlineUsers'
import "./Stage.css"

function Stage() {
    return (
        <div>
            <OnlineUsers />
            <Grid container className="stage" >
                <Grid item md={7} xs={12}  >
                    <Card style={{height: '100%', maxHeight: "100%"}}>
                        <CardContent>
                         <DynamicPage />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={5} xs={12} >
                    <Card  style={{height: '100%', maxHeight: "100%"}}>
                        <CardContent>
                            <Lecture />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Static />
                </Grid>
            </Grid>
        </div>
    )
}

export default Stage
