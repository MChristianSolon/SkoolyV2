import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox'


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      margin: 'auto'
    },
  }));

function SingleQuestion({index}) {
      const classes = useStyles();
      const [options, setOptions] = useState([])

      useEffect(() => {
        setOptions(() => {
            let newArr = []
            for(let i = 0; i < 4 ; i++){
                newArr.push(
                    <ListItem button>
                    <ListItemIcon>
                        <Checkbox/>
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    </ListItem>
                )
            }
            return newArr; 
        })
      },[])
    return (
        <div>
        <Card>
            <CardContent>
                <Grid container>
                    <Grid item xs={1} style={{fontWeight: 'bold', fontSize: 24}}>
                    {index} . )
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.root}>
                             <img style={{height: '300px', marginBottom: '0px'}} src="https://dr282zn36sxxg.cloudfront.net/datastreams/f-d%3Abef29a9072cee56d1926b221311ad6c0e5fefd491f41b6593e0d0745%2BIMAGE_TINY%2BIMAGE_TINY.1" alt="graph" />
                            <List component="nav" aria-label="main mailbox folders">
                                {options}
                            </List>
                            <Divider />
                            </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        <Divider />
        </div>
    )
}

export default SingleQuestion
