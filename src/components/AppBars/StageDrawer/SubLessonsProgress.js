import React, {useState, useEffect} from 'react'
import SingleCourseProgress from './SingleCourseProgress'
import {db, auth} from '../../../Firebase/Firebase' 

function SubLessonsProgress() {
    const [subLessonsProgress, setSubLessonsProgress] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user){
                setUser(user.uid)
            }else{
                setUser(null)
            }
        })
    },[])

    useEffect(() => {
        if(user){        
            db.collection('users').doc(`${user}`).onSnapshot(doc => {
                const newArr = []
                Object.values(doc.data().courses).forEach(course => {
                    Object.keys(course).forEach(progress => {
                    newArr.push(
                        <SingleCourseProgress key={progress} SubLessonTitle={progress} percent={course[progress]}/>
                    ) 
                    })
                })
                setSubLessonsProgress(newArr)   
            })  
        }
    }, [user])

    return (
        <div>
            {subLessonsProgress}
        </div>
    )
}

export default SubLessonsProgress
