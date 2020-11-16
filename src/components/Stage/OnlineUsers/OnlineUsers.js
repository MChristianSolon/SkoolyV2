import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
    root: {
      [theme.breakpoints.up('lg')]: {
        position: 'absolute',
        right: '5%'
      },
    },
  }));

function OnlineUsers() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
           <Chip icon={<FiberManualRecordIcon style={{color: '#9ccc65'}}/>} label="Tim Timothy"/>
        </div>
    )
}

export default OnlineUsers
