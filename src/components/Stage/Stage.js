import React, { useContext, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Lecture from './Lecture/Lecture'
import DynamicPage from './DynamicPage/DynamicPage'
import Static from './Static/Static'
import OnlineUsers from './OnlineUsers/OnlineUsers'
import queryString from 'query-string'
import {CurrentTimeContext} from '../Contexts/CurrentTime'
import {db} from '../../Firebase/Firebase'
import "./Stage.css"
import { SubLessonContext } from '../Contexts/SubLesson'

function Stage({location}) {
    const [host, setHost] = useState("")
    const [room ,setRoom] = useState("")
    const [roomData, setRoomData] = useState({})
    const [globalCurrentTime, setGlobalCurrentTime] = useState(0)
    const {currentSubLesson} = useContext(SubLessonContext)

    useEffect(() => {
        const { host, room } = queryString.parse(location.search);
        setHost(host);
        setRoom(room);
    },[location]) 

    useEffect(() => {
        db.collection('courses').where('room', '==' ,`123`).get().then(snap => {
            snap.forEach(doc => {
                if(doc.data().SubLessons[`${currentSubLesson}`]){
                    setRoomData(doc.data().SubLessons[`${currentSubLesson}`])
                }
            })
        })
    },[globalCurrentTime, currentSubLesson])

    return (
        <CurrentTimeContext.Provider value={{globalCurrentTime, setGlobalCurrentTime}}>
                <OnlineUsers />
                <Grid container className="stage" >
                    <Grid item md={7} xs={12}  >
                        <Card style={{height: '100%', maxHeight: "100%"}}>
                            <CardContent>
                            <DynamicPage roomData={roomData}/>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={5} xs={12} >
                        <Card  style={{height: '100%', maxHeight: "100%"}}>
                            <CardContent>
                                <Lecture host={host} room={room} roomName={room.course_name}/>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Static />
                    </Grid>
                </Grid>
    </CurrentTimeContext.Provider>
    )
}

export default Stage
