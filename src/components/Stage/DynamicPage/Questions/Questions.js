import React,{useState, useEffect} from 'react'
import SingleQuestion from './SingleQuestion'
import Grid from '@material-ui/core/Grid'
import './Question.css'

function Questions({questions}) {
    const [questionArr, setQuestionArr] = useState([])

   useEffect(() => {
    setQuestionArr(() => {
        const newArr = []
        for(let i = 0; i < 3; i++){
            newArr.push(<SingleQuestion key={i}/>)
        }
        for (var key in questions) {
            if (questions.hasOwnProperty(key)) {
                newArr.push(<SingleQuestion key={Math.random()*10000} text={key} commenter={questions[key].commenter} answers={questions[key].replies}/>)
            }
        }
        return newArr
    })
   },[questions])
    return (
        <Grid container spacing={6} className="questions">
            {questionArr}           
        </Grid>
    )
}

export default Questions
