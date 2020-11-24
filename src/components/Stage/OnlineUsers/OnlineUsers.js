import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    root: {
      [theme.breakpoints.up('lg')]: {
        position: 'absolute',
        right: '5%',
      },
    },
    
  }));

function OnlineUsers() {
    const classes = useStyles();
    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
      setOnlineUsers(() => {
        const newArr = []
        for(let i = 0; i < 10; i++){
          newArr.push(
            <Grid item key={i}>
              <Chip icon={<FiberManualRecordIcon style={{color: '#9ccc65'}}/>} label="Tim Timothy"/>
            </Grid>
          )
        }
        return newArr; 
      })
    },[])
    return (
        <div className={classes.root}>
          <Grid container direction={'column'} spacing={2}>
           {onlineUsers}
          </Grid>
        </div>
    )
}

export default OnlineUsers
