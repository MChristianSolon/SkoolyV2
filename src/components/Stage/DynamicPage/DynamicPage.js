import React from 'react'
import Grid from '@material-ui/core/Grid'
import BonusMaterial from './BonusMaterial/BonusMaterial'
import Questions from './Questions/Questions'
import SectionInfo from './SectionInfo/SectionInfo'
import './DynamicPage.css'


function DynamicPage() {
    return (
             <Grid container className="dynamicPage">
             <Grid item md={12}>
                    <SectionInfo />
                    <Questions />
                 </Grid>
                 <Grid item md={12} xs={12}>
                     <BonusMaterial />
                 </Grid>
             </Grid>
    )
}

export default DynamicPage
