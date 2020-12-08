import React, { useContext, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Lecture from './Lecture/Lecture'
import DynamicPage from './DynamicPage/DynamicPage'
import Static from './Static/Static'
import queryString from 'query-string'
import {CurrentTimeContext} from '../Contexts/CurrentTime'
import {db, auth} from '../../Firebase/Firebase'
import axios from './Transcripts/trans'
import "./Stage.css"
import { SubLessonContext } from '../Contexts/SubLesson'
import {RoomDataContext} from '../Contexts/RoomDataContext'

function Stage({location}) {
    const [host, setHost] = useState("")
    const [room ,setRoom] = useState("")
    const [roomData, setRoomData] = useState({})
    const [globalCurrentTime, setGlobalCurrentTime] = useState(0)
    const [currentCourse, setCurrentCourse] = useState('') 
    const {currentSubLesson} = useContext(SubLessonContext)
    const {globalRoomData, setGlobalRoomData} = useContext(RoomDataContext)
    const [roomId, setRoomId] = useState("")
    const [videoTranscript, setVideoTranscript] = useState("")
    const [currentUser] = useState({})

    useEffect(() => {
        const { host, room } = queryString.parse(location.search);
        setHost(host);
        setRoom(room);
    },[location]) 

    useEffect(() => {
        db.collection('courses').where('room', '==' ,`${room}`).onSnapshot(snap => {
            snap.forEach(doc => {
                setGlobalRoomData(doc.data().SubLessons)
                setRoomId(doc.id)
                setCurrentCourse(doc.data().course_name)
                if(doc.data().SubLessons[`${currentSubLesson}`]){
                    setRoomData(doc.data().SubLessons[`${currentSubLesson}`])
                }
            })
        })
    },[currentSubLesson,room, setGlobalRoomData])

      //transcript Logic
      function youtube_parser(url){
          if(url){
              var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
              var match = url.match(regExp);
              return (match&&match[7].length===11)? match[7] : false;
          }
    }

    useEffect(() => {
        let phrases = ""; 
        async function fetchTranscriptData(){
            const request = await axios.post(`timedtext?lang=en&v=${youtube_parser(roomData.video_url)}`).then(response => {
                let parser = new DOMParser();
                let xml = parser.parseFromString(response.data, "application/xml");
                phrases = xml.getElementsByTagName('text');
            }).then(() => {
                setVideoTranscript(phrases)
            });
            return request;
        }
        fetchTranscriptData();      
    }, [roomData])

    //user course
    useEffect(() => {
        if(auth.currentUser && currentCourse){   
            db.collection('users').doc(`${auth.currentUser.uid}`).get().then(doc => {
               if(doc.data().courses[currentCourse]){
               }
            })
        }else if(currentCourse){
            let keys = {}
            const lesson = {}
            Object.keys(globalRoomData).forEach(key => {
                lesson[key] = 0
            })
        keys = lesson
        db.collection('users').doc(`${auth.currentUser.uid}`).update({
            [`courses.${currentCourse}`] : keys
        })
        }
    },[currentCourse, globalRoomData])

    return (
        <CurrentTimeContext.Provider value={{globalCurrentTime, setGlobalCurrentTime}}>
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
                                <Lecture host={host} room={room} roomName={roomData.course_name} videoId={youtube_parser(roomData.video_url)} currentUser={currentUser}/>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Static videoTranscript={videoTranscript}/>
                    </Grid>
                </Grid>
    </CurrentTimeContext.Provider>
    )
}

export default Stage
