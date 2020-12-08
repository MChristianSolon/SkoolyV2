import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { uiConfig } from '../../Firebase/Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {db, auth} from '../../Firebase/Firebase'

function LandingPage() {
    const [loggedIn, setLoggedIn] = useState("")
    function handleLogOut() {
        auth.signOut();
        window.location.replace('http://localhost:3000/');
        }
    
     useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                setLoggedIn('https://31.media.tumblr.com/0782bfb10916e5d18edf43cfaf3e0a8a/tumblr_inline_ncn1fjiKA41sf8doh.png')
                db.collection('users').doc(`${user.uid}`).get().then((docData) => {
                    if (docData.exists) {
                      // document exists (online/offline)
                    } else {
                        db.collection('users').doc(`${user.uid}`).set({
                            courses: {},
                            email: user.email,
                            username: user.displayName,
                            photo: user.photoURL 
                        })
                    }
                  }).catch((fail) => {
                    // Either
                    // 1. failed to read due to some reason such as permission denied ( online )
                    // 2. failed because document does not exists on local storage ( offline )
                  })
            }else{
                setLoggedIn('https://media.tenor.com/images/dc2f1dc86ab5b187e7909138e0faed73/tenor.png')
            }
        })
     }, [])
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
            <ButtonGroup>
                 <Button href={`/stage/?host=${"CHRIS"}&room=${"123"}`} variant="contained" color="primary" size="large">Stage</Button>
                 <Button href={`/create`} variant="contained" color="secondary" size="large">Create</Button>
            </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
            <img src={loggedIn} alt="" />
            <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={auth}
                    style={{
                    margin: 'auto',
                    textAlign: 'center',
                    }}
              ></StyledFirebaseAuth>
            </Grid>
            <Grid item xs ={12}>
            <Button onClick={handleLogOut}>LogOut</Button>
            </Grid>
        </Grid>
    )
}

export default LandingPage
