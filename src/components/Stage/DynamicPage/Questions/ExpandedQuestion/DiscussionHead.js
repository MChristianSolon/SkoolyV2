import React from 'react'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'

function DiscussionHead({questionText, commenter}) {
    return (
        <Grid container>
            <Grid item xs={12}>
            <Chip
            avatar={<Avatar style={{backgroundColor: "white"}} alt={commenter[0]} src="/static/images/avatar/1.jpg" ></Avatar>}
            label= {commenter}
            />
            </Grid>
            <Grid item xs={12}>
                <h1 style={{marginLeft: '5%'}}>
                {questionText}
                </h1>
            </Grid>
            <Grid item xs={12}>
                <Divider /> 
            </Grid>
        </Grid>
    )
}

export default DiscussionHead
