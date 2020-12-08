import './App.css';
import 'fontsource-roboto'
import React, {useState, useEffect } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Homepage from './components/Homepage/Homepage';
import Container from '@material-ui/core/Container'
import Profile from './components/Profile/Profile';
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {grey} from '@material-ui/core/colors'
import Stage from './components/Stage/Stage';
import AppBar from './components/AppBars/AppBar'
import Grid from '@material-ui/core/Grid'
import { SubLessonContext } from './components/Contexts/SubLesson'
import {RoomDataContext} from './components/Contexts/RoomDataContext'
import {CurrentUserContext} from './components/Contexts/CurrentUser'
import CreatorStudio from './components/CreatorStudio/CreatorStudio';
import {auth} from './Firebase/Firebase'

const theme = createMuiTheme({
  pallette: {
    primary: {
      main: grey[900]
    }
  },
})

function App() {
  const [currentSubLesson, setCurrentSubLesson] = useState('Adding Matrices')
  const [globalRoomData, setGlobalRoomData] = useState("Kanye")
  const [currentUser, setCurrentUser] = useState({})
  
  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
        if (user) {
          setCurrentUser({
              name: user.displayName,
              email: user.email,
              photo: user.photoURL
          })
        }else{
            console.log("no one logged in ")
        }
      });
  },[])

  return (
    <Router >
      <ThemeProvider theme={theme}>
      <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
      <SubLessonContext.Provider value={{currentSubLesson, setCurrentSubLesson}}>
        <RoomDataContext.Provider value = {{globalRoomData, setGlobalRoomData}}>
        <AppBar />
        <Grid container>
          <Grid item md={12}>
          <Container className="App">
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/home" component={Homepage} />
              <Route path="/profile"  component={Profile}/>
              <Route path="/stage" component={Stage} />
              <Route path="/create" component={CreatorStudio} />
            </Switch>
            </Container>
          </Grid>
        </Grid>
         </RoomDataContext.Provider>
        </SubLessonContext.Provider>
        </CurrentUserContext.Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
