import React,{useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import "./Chat.css"
import SingleMessage from './SingleMessage'

function Chat() {
    const [chatArr, setChatArr] = useState([])
    useEffect(() => {
        setChatArr(() => {
            const newArr = []
            for(let i = 0; i < 2; i++){
                newArr.push(<SingleMessage message="Christian Loves"/>)
            }
            return newArr
        })
    },[])
    return (
        <Card className="chat">
            <CardContent>
                <Grid container style={{height: '100%'}}>
                    <Grid item xs={12} className="chat_arr">
                        {chatArr}
                        <TextField placeholder="Enter Message" className="chat__textField" variant="standard"/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Chat
