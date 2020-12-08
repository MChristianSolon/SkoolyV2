import React,{useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from "@material-ui/core/Grid"
import "../DynamicPage.css"
import AddBonusContent from './AddBonusContent'

function BonusMaterial({static_content}) {
    // const [bonusMaterial, setBonusMaterial] = useState([])
    const [bonusEmbedd] = useState("")

    useEffect(() => {
        //setBonusMaterial(static_content)
    },[static_content])

    // useEffect(() => {
    //     var http = new XMLHttpRequest();
    //     http.open('HEAD', 'https://docs.google.com/presentation/d/1z29NAXY9JZEh69tTmanM5T82wyaD-hC2/edit', false);
    //     http.send();

    //     if (http.status === 404) {
    //         console.log('rip')
    //     } else {
    //         setBonusEmbedd(<embed
    //             className="bonusMaterial__embed"
    //             key={"randomLink"}
    //             id="stageFrame"
    //             src="https://docs.google.com/presentation/d/1z29NAXY9JZEh69tTmanM5T82wyaD-hC2/edit"
    //             />)
    //     }
    // },[])
    return (
        <Card className="bonusMaterial">
            <CardContent className="bonusMaterial__content">
                <Grid style={{height: "90%"}}>  
                {false ?  
                bonusEmbedd : 
                <AddBonusContent />
                }
                </Grid>
            </CardContent>
        </Card>
    )
}

export default BonusMaterial
