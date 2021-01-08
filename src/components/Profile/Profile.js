import React, {useState, useEffect, useContext} from 'react'
import Grid from '@material-ui/core/Grid'
import Courses from './Course/Courses'
import './Profile.css'
import Calendar from './Calendar/Calendar'
import Title from './Title/Title'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CreatorDashboard from './CreatorDashboard/CreatorDashboard'
import {db} from '../../Firebase/Firebase'
import {CurrentUserContext} from '../Contexts/CurrentUser'

function Profile() {
    const [dashboard, setDashboard] = useState('user')
    const {currentUser} = useContext(CurrentUserContext)
    const [courses, setCourses] = useState({})

    useEffect(() => {
        db.collection('users').where('email', '==' ,`${currentUser.email}`).onSnapshot(snap => {
            snap.forEach(doc => {
                setCourses(doc.data().courses)
            })
        })
    },[currentUser.email])


    let user = ( <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button color="primary" size="large" variant="outlined" onClick={() => setDashboard('creator')}>User DashBoard</Button>
                    </Grid> 
                    <Grid item xs={6}>
                        <Title />
                    </Grid>
                    <Grid item xs={6}>
                        <Calendar />
                    </Grid>
                    <Grid item xs={12}>
                        <h3>Courses</h3>
                    </Grid>
                    <Grid item xs={12}>
                    <Courses myCourses={courses}/>
                    </Grid>
                </Grid>
    )
    return (
        <Container>
           {dashboard === 'user' ? user : <CreatorDashboard setDashboard={setDashboard}/>}
        </Container>
    )
}

export default Profile
