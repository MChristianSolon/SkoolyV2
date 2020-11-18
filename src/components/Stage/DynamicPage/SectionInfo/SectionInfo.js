import React, {useContext} from 'react'
import { SubLessonContext } from '../../../Contexts/SubLesson'
import Grid from '@material-ui/core/Grid'
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button'

function SectionInfo({globalCurrentTime}) {
    const {currentSubLesson} = useContext(SubLessonContext)
    return (
        <Grid container spacing={2} direction="row">
            <Grid item xs={12}>
            {currentSubLesson}
            {globalCurrentTime}
            </Grid>
            <Grid item xs={4}>
               <Button variant={"contained"} color="primary" startIcon={<CreateIcon />}>
                 Ask A Question
               </Button>
            </Grid>
        </Grid>
      
    )
}

export default SectionInfo
