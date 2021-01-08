import React, {useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import SingleQuestion from './SingleQuestion'
import  Button  from '@material-ui/core/Button'

function Quiz({stageType}) {
    const [questions, setQuestions] = useState([])
    useEffect(() => { 
        setQuestions(() => {
            let newArr = [] 
            for(let i = 0; i < 5; i++) {
                newArr.push(<SingleQuestion key={i} index={i}/>)
            }
            return newArr
        })
    }, [])
    return (
        <Card style={stageType === "Quiz" ? {} : {display: 'none'}}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Test Name</h1>
                        <h2>items: 5</h2>
                    </Grid>
                    <Grid item xs={12}>
                       {questions} 
                    </Grid>
                    <Grid item xs={12}>
                     <Button variant="contained" color="primary" style={{width: '80%'}} size="large">Submit</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

    )
}

export default Quiz
