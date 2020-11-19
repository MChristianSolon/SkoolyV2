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
    const [roomId, setRoomId] = useState("")

    useEffect(() => {
        const { host, room } = queryString.parse(location.search);
        setHost(host);
        setRoom(room);
    },[location]) 

    useEffect(() => {
        db.collection('courses').where('room', '==' ,`${room}`).onSnapshot(snap => {
            snap.forEach(doc => {
                setRoomId(doc.id)
                if(doc.data().SubLessons[`${currentSubLesson}`]){
                    setRoomData(doc.data().SubLessons[`${currentSubLesson}`])
                }
            })
        })
    },[currentSubLesson, room])

    return (
        <CurrentTimeContext.Provider value={{globalCurrentTime, setGlobalCurrentTime}}>
                <OnlineUsers />
                <Grid container className="stage" style={{height: '100vh'}} >
                    <Grid item md={7} xs={12}  >
                        <Card style={{height: '100%', maxHeight: "100%"}}>
                            <CardContent>
                            <DynamicPage roomData={roomData} roomId={roomId}/>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={5} xs={12} >
                        <Card  style={{height: '100%', maxHeight: "100%"}}>
                            <CardContent style={{height: '100%', maxHeight: "100%"}}>
                                <Lecture host={host} room={room} roomName={roomData.course_name}/>
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
