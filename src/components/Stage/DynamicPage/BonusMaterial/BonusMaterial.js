import React,{useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from "@material-ui/core/Grid"
import "../DynamicPage.css"
import AddBonusContent from './AddBonusContent'

function BonusMaterial({static_content}) {
    const [bonusMaterial, setBonusMaterial] = useState([])

    useEffect(() => {
        setBonusMaterial(static_content)
        setBonusMaterial(false)
    },[static_content])
    return (
        <Card className="bonusMaterial">
            <CardContent className="bonusMaterial__content">
                <Grid style={{height: "90%"}}>  
                {bonusMaterial ?  
                <embed
                className="bonusMaterial__embed"
                key={"randomLink"}
                id="stageFrame"
                src="https://docs.google.com/presentation/d/1z29NAXY9JZEh69tTmanM5T82wyaD-hC2/edit"
                /> : 
                <AddBonusContent />
                }
                </Grid>
            </CardContent>
        </Card>
    )
}

export default BonusMaterial
