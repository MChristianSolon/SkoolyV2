import React,{useState, useEffect, useContext} from 'react'
import SingleQuestion from './SingleQuestion'
import Grid from '@material-ui/core/Grid'
import { SubLessonContext } from '../../../Contexts/SubLesson'
import { CurrentTimeContext } from '../../../Contexts/CurrentTime'
import './Question.css'

function Questions({questions, roomId}) {
    const [questionArr, setQuestionArr] = useState([])
    const {currentSubLesson} = useContext(SubLessonContext)
    const {globalCurrentTime} = useContext(CurrentTimeContext)

   useEffect(() => {
       if(questions){
            setQuestionArr(() => {
                const newArr = []
                for (var key in questions[globalCurrentTime].questions) {
                    if (questions[globalCurrentTime].questions.hasOwnProperty(key)) {
                        newArr.push(<SingleQuestion 
                            key={Math.random()*10000} 
                            roomId={roomId} 
                            questionTime={globalCurrentTime}
                            text={key} 
                            commenter={questions[globalCurrentTime].questions[key].commenter} 
                            answers={questions[globalCurrentTime].questions[key].replies}/>)
                    }
                }
                return newArr
            })
       }
   },[questions, currentSubLesson, roomId, globalCurrentTime])

    return (
        <Grid container spacing={6} className="questions">
            {questionArr}           
        </Grid>
         )
}

export default Questions
