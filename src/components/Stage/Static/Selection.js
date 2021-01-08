import React from 'react'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'

function Selection() {
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                 <Avatar>H</Avatar>
                </Grid>
                <Grid item xs={12} style={{fontWeight: 'bold'}}>
                 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere eveniet repellat voluptas totam eum aut earum labore voluptatibus commodi, pariatur neque nam quae, dolor, molestiae debitis id molestias aliquid tenetur.
                </Grid>
            </Grid>
        </div>
    )
}

export default Selection
