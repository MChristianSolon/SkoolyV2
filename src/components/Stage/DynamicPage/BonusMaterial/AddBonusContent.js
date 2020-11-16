import React from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DescriptionIcon from '@material-ui/icons/Description';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import IconButton from '@material-ui/core/IconButton'

    const useStyles = makeStyles({
        abc_icon: {
            width: 60,
            height: 60,
        },
        abc_position:{
            position: 'relative',
            top: '25%'
        }
    })

function AddBonusContent() {
    const classes = useStyles()
    return (
        <div>
            <h1>Add Material</h1>
            <Grid container>
                <Grid item xs={4}>
                    <IconButton className={classes.abc_position}>
                    <AddCircleIcon className={classes.abc_icon}/>
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <IconButton className={classes.abc_position}>
                    <DescriptionIcon className={classes.abc_icon}/>
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <IconButton className={classes.abc_position}>
                    <CropOriginalIcon className={classes.abc_icon}/>
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddBonusContent
