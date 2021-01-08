import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './profileCalendar.css'


const cardStyle = {
    transitionDuration: '0.3s',
    height: '35vh',

}
function CalendarComp() {
    const [value, onChange] = useState(new Date());
    return (
        <Card variant="elevation" style={cardStyle}>  
        <Grid container className="UserCard">
            <Grid item xs={12} style={{height: '35vh'}}>
            <Calendar
                onChange={onChange}
                value={value}
                className="profile-calendar"
            />
            </Grid>
        </Grid>
        </Card>
    )
}


export default CalendarComp
