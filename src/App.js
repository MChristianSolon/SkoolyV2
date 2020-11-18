import React, {useState } from 'react'
import './App.css';
import 'fontsource-roboto'
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

const theme = createMuiTheme({
  pallette: {
    primary: {
      main: grey[900]
    }
  },
})



function App() {
  const [currentSubLesson, setCurrentSubLesson] = useState('Adding Matrices')

  return (
    <Router >
      <ThemeProvider theme={theme}>
      <SubLessonContext.Provider value={{currentSubLesson, setCurrentSubLesson}}>
        <AppBar />
        <Grid container>
          <Grid item md={12}>
          <Container className="App">
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/home" component={Homepage} />
              <Route path="/profile"  component={Profile}/>
              <Route path="/stage" component={Stage} />
            </Switch>
            </Container>
          </Grid>
        </Grid>
        </SubLessonContext.Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
