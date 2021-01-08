import React, {useContext} from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import {CurrentUserContext} from '../../Contexts/CurrentUser'
import Button from '@material-ui/core/Button'
import bean from '../../../assets/images/bean.jpg'

const cardStyle = {
    transitionDuration: '0.3s',
    height: '35vh',

}

function Titled() {
    const {currentUser} = useContext(CurrentUserContext)
    return (
        <Card variant="elevation" style={cardStyle}>  
        <Grid container className="UserCard">
            <Grid container direction="column" spacing={1}>
                <Grid item xs={12}>
                    <img style={{height: '15vh', marginTop: '20px'}} src={bean} alt="service" />
                </Grid>
                <Grid item xs={12}>
                    <h4>
                    {currentUser.name} rank: bean
                    </h4>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined">Edit Profile</Button>
                </Grid>
            </Grid>
        </Grid>
    </Card>
    )
}

export default Titled

