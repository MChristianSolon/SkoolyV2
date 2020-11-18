import React, {useState} from 'react'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DescriptionIcon from '@material-ui/icons/Description';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

    const useStyles = makeStyles({
        abc_icon: {
            width: 60,
            height: 60,
        },
        abc_position:{
            position: 'relative',
            top: '45%'
        },
        add_position: {
            position: 'relative',
            marginTop: '8%'
        }
    })

function AddBonusContent() {
    const classes = useStyles()
    const [addingMaterial, setAddingMaterial] = useState(false)

    const handleAddMaterial= () => {
        setAddingMaterial(true)
    }

    return (
        <div>
            {addingMaterial ? 
            <Grid container direction="row">
                <Grid item xs={4}>
                    <IconButton className={classes.abc_position}>
                    <AddCircleIcon className={classes.abc_icon}/>
                                Upload a File
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <IconButton className={classes.abc_position}>
                    <DescriptionIcon className={classes.abc_icon}/>
                                 Add A Google Doc
                    </IconButton>
                </Grid>
                <Grid item xs={4}>
                    <IconButton className={classes.abc_position}>
                    <CropOriginalIcon className={classes.abc_icon}/>
                            Upload an Image
                    </IconButton>
                </Grid>
            </Grid>
            : 
            <div className={classes.add_position}>
                <Button size="large" variant="outlined" color="secondary" onClick={handleAddMaterial}>Add Material</Button>
            </div>
}
        </div>
    )
}

export default AddBonusContent
