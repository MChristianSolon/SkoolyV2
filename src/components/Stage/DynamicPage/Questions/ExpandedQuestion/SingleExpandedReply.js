import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Chip from '@material-ui/core/Chip'

function SingleExpandedReply({response}) {
    return (
       <Grid container spacing={3} style={{width: '80%', margin: 'auto'}}>
           <Grid item>
           <Chip
            avatar={<Avatar style={{backgroundColor: "white"}} alt={response.user.name[0]} src={response.user.photo} ></Avatar>}
            label= {response.user.name}
            /> 
            </Grid>
            <Grid item>
                {response.reply}
            </Grid>
            <Grid item xs={12}>
            <Divider />
            </Grid>
       </Grid>

    )
}

export default SingleExpandedReply
