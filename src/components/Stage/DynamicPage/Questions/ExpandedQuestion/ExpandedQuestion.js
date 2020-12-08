import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import DiscussionHead from './DiscussionHead';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import DiscussionBody from './DiscussionBody';
import Grid from '@material-ui/core/Grid'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import OpenWithIcon from '@material-ui/icons/OpenWith';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '80vw',
    height: '75vh',
    backgroundColor: "#f5f5f5",
    border: '2px solid black',
    padding: theme.spacing(2, 4, 3),
    position:"absolute",
    left:0,
    right:0,
    top: "10%",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function SimpleModal({questionText, commenter, responses}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
      <Card className={classes.paper} variant="outlined" >
        <CardContent style={{height: '100%'}}>
          <Card style={{height: '100%'}}>
            <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <DiscussionHead questionText={questionText} commenter={commenter}/>
              </Grid>
              <Grid item xs={12}>
              <AddCircleIcon style={{float:"right", fontSize: "36px"}}/>
              </Grid>
              <Grid item xs={12}>
              <DiscussionBody responses={responses}/>
              </Grid>
            </Grid>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
  );

  return (
    <div>
      <div type="button" onClick={handleOpen}>
       <OpenWithIcon /> Open Modal
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
