import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'

function SingleExpandedReply({response}) {
    return (
       <Grid container spacing={3} style={{border: '1px solid black', width: 'fit-content'}}>
           <Grid item>
               <Avatar src={response.user.photo} />
            </Grid>
            <Grid item>
               {response.user.name}
            </Grid>
            <Grid item>
                {response.reply}
            </Grid>
       </Grid>

    )
}

export default SingleExpandedReply
