import React,{useState, useEffect, useContext} from 'react'
import SingleQuestion from './SingleQuestion'
import Grid from '@material-ui/core/Grid'
import { SubLessonContext } from '../../../Contexts/SubLesson'
import { CurrentTimeContext } from '../../../Contexts/CurrentTime'
import Divider from '@material-ui/core/Divider'
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
                            questionKey = {key}
                            questionTime={globalCurrentTime}
                            text={questions[globalCurrentTime].questions[key].question} 
                            commenter={questions[globalCurrentTime].questions[key].user} 
                            answers={questions[globalCurrentTime].questions[key].replies}
                            photo={questions[globalCurrentTime].questions[key].photo}/>)
                    }
                }
                return newArr
            })
       }
   },[questions, currentSubLesson, roomId, globalCurrentTime])

    return (
        <div style={{marginTop: '10px'}}>
            <Grid container spacing={6} className="questions">
                {questionArr}           
            </Grid>
            <Divider />
        </div>
         )
}

export default Questions
