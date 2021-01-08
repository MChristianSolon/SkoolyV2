import React,{useState, useEffect, useContext} from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import io from 'socket.io-client'
import SingleMessage from './SingleMessage'
import ScrollToBottom from 'react-scroll-to-bottom';
import InputAdornment from '@material-ui/core/InputAdornment'
import SendIcon from '@material-ui/icons/Send';
import {CurrentUserContext} from '../../../Contexts/CurrentUser'
import "./Chat.css"


let socket;
// const ENDPOINT = 'heroku endpoint'
const ENDPOINT = 'http://localhost:4000/'; 

function Chat({host, room}) {
    const [chatArr, setChatArr] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [user, setUser] = useState("")
    const {currentUser} = useContext(CurrentUserContext)
    //entering room
    useEffect(() => {
        setUser(currentUser.name)
    }, [currentUser])
    useEffect(() => {       
            socket = io.connect(ENDPOINT);
            socket.emit('join', { host, room , user})
            return socket.off('join')
    },[host, room, user])

    //leaving room
 
    //recieving messages
    useEffect(() => {
        socket.on('message', (msg) => {
            let newMsg = <SingleMessage text={msg.text} key={Math.random()} username={msg.username}/> 
          setChatArr((prevArr) => {
            return [...prevArr, newMsg]
          })
        })
        //unsubscribe
        return () => socket.off('message')
      
       },[user])
    
    const handleSendMessage = (event) => {
        event.preventDefault(); 
        socket.emit('newMessage', {user, newMessage, room})
        setNewMessage("") 
    }

    return (
        <div>
            <Card className="chat" style={{height:'22vh'}} spacing={4}>
                <CardContent >
                    <Grid item xs={12} style={{height:'20vh'}}>
                        <ScrollToBottom>
                            <div style={{height:'15vh'}}>
                                {chatArr}
                                </div> 
                        </ScrollToBottom>
                        <form onSubmit={handleSendMessage} >
                            <TextField placeholder="Enter Message" className="chat__textField" variant="standard" 
                                value={newMessage} onChange={event => setNewMessage(event.target.value)}  InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SendIcon />
                                    </InputAdornment>
                                ),
                                }}/>
                            <button type="submit" style={{display: 'none'}}/>
                            </form> 
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default Chat
