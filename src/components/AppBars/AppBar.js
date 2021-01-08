import React from 'react'
import PrimarySearchAppBar from './PrimarySearchAppBar'
import ResponsiveDrawer from './ResponsiveDrawer'
import ProfileAppBar from './ProfileAppBar'
import { useLocation } from 'react-router-dom'
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles'


const stageTheme = createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 1400,
        md: 1500,
        lg: 1600,
        xl: 1920,
      },
    },
  })

function AppBar() {
    
  const location = useLocation();

    return (
    <ThemeProvider theme={stageTheme}>
        <div>
            {location.pathname === '/stage/' ? 
            <ResponsiveDrawer /> :
            location.pathname === '/profile' ? 
            <ProfileAppBar /> :
            <PrimarySearchAppBar />
            }
        </div>
    </ThemeProvider>
    )
}

export default AppBar
