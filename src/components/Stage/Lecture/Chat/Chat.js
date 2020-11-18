import React,{useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import io from 'socket.io-client'
import SingleMessage from './SingleMessage'
import ScrollToBottom from 'react-scroll-to-bottom';
import "./Chat.css"

let socket;
// const ENDPOINT = 'heroku endpoint'
const ENDPOINT = 'http://localhost:4000/'; 

function Chat({host, room}) {
    const [chatArr, setChatArr] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [user, setUser] = useState("John Hancock")

    //entering room
    useEffect(() => {
        setUser("Mark Solon")
        socket = io.connect(ENDPOINT);
        socket.emit('join', { host, room , user})
        return socket.off('join')
    },[host, room, user])
 
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
        <Card className="chat">
            <CardContent>
                <Grid container style={{maxHeight: '100%'}}>
                <ScrollToBottom style={{maxHeight: '80%'}}>
                    <Grid item xs={12} className="chat_arr">
                       
                        {chatArr}
                        <form onSubmit={handleSendMessage}>
                        <TextField placeholder="Enter Message" className="chat__textField" variant="standard" value={newMessage} onChange={event => setNewMessage(event.target.value)}/>
                        <button type="submit" style={{display: 'none'}}/>
                        </form>
                    
                    </Grid>
                    </ScrollToBottom>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Chat
