import React,{useState, useEffect} from 'react'
import SingleQuestion from './SingleQuestion'
import Grid from '@material-ui/core/Grid'
import './Question.css'

function Questions() {
    const [questionArr, setQuestionArr] = useState([])

   useEffect(() => {
    setQuestionArr(() => {
        const newArr = []
        for(let i = 0; i < 4; i++){
            newArr.push(<SingleQuestion />)
        }
        return newArr
    })
   },[])
    return (
        <Grid container spacing={6} className="questions">
            {questionArr}           
        </Grid>
    )
}

export default Questions
