import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { SubLessonContext } from '../Contexts/SubLesson';
import {RoomDataContext} from '../Contexts/RoomDataContext'
import StageDrawer from './StageDrawer/StageDrawer'
import Button from '@material-ui/core/Button'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {db, auth} from '../../Firebase/Firebase'

const drawerWidth = 215;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {currentSubLesson, setCurrentSubLesson} = useContext(SubLessonContext)
  const {globalRoomData} = useContext(RoomDataContext)
  const [subLessons, setSubLessons] = useState([])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubLessonChange = (subLesson) => {
    setCurrentSubLesson(subLesson)
  }

  useEffect(() => { 
    setSubLessons(Object.keys(globalRoomData))
  }, [globalRoomData])

  const handleComplete = () => {
    setCurrentSubLesson(subLessons[subLessons.indexOf(currentSubLesson) + 1])
    db.collection('users').doc(`${auth.currentUser.uid}`).update({
      [`courses.${`Linear Algebra`}.${currentSubLesson}`] : 100
    })
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {subLessons.sort().map((text, index) => (
          <ListItem button key={text} 
          onClick={() => handleSubLessonChange(text)} 
          style={currentSubLesson === text ? {backgroundColor: "#9e9e9e"} : {}}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Proceed'].map((text) => (
          <ListItem key={text} onClick={handleComplete}>
            <Button color="primary" variant="contained" startIcon={<NavigateNextIcon />}>{text}</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const drawerRight = (
    <div>
      <div className={classes.toolbar} />
      <StageDrawer />
      </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
  
      <CssBaseline />
        <Grid container  justify="space-between" spacing={10}>
          <Grid item>
          <AppBar position="fixed" className={classes.appBar} style={{ background: 'transparent', boxShadow: 'none', color: 'black', position: 'relative'}}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Link to="/">
                <Typography className={classes.title} variant="h6" noWrap>
                  Skooly
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
          </Grid>
        </Grid>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
          >
            {drawer}
          </Drawer>
          <Drawer
            anchor="right"
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
          >
            {drawerRight}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
