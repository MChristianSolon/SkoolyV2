import React,{useState, useEffect, useContext} from 'react'
import SingleQuestion from './SingleQuestion'
import Grid from '@material-ui/core/Grid'
import { SubLessonContext } from '../../../Contexts/SubLesson'
import './Question.css'

function Questions({questions}) {
    const [questionArr, setQuestionArr] = useState([])
    const {currentSubLesson} = useContext(SubLessonContext)

   useEffect(() => {
    setQuestionArr(() => {
        const newArr = []
        for (var key in questions) {
            if (questions.hasOwnProperty(key)) {
                newArr.push(<SingleQuestion key={Math.random()*10000} text={key} commenter={questions[key].commenter} answers={questions[key].replies}/>)
            }
        }
        return newArr
    })
   },[questions, currentSubLesson])
    return (
        <Grid container spacing={6} className="questions">
            {questionArr}           
        </Grid>
    )
}

export default Questions
