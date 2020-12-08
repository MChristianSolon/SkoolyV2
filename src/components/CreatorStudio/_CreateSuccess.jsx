import React, { useRef } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';

function CreateSuccess({ url }) {
    const urlField = useRef();

    const copyToClipboard = () => {
        urlField.current.select();
        document.execCommand('copy');
    }

    return (
        <Grid container justify="center" alignItems="center" style={{height: '50vh', width: '100%'}}>
            <Grid item container direction="column" justify="center" alignContent="center">
                <img src="https://media1.tenor.com/images/3ffc9f941d9f6187193e17485f3b1612/tenor.gif?itemid=18581387" style={{width: '500px'}} alt="success"/>
                
                <Typography variant="h3">Course Created</Typography>
                <TextField value={url} inputRef={urlField}/>
                <Button color="primary" onClick={copyToClipboard}>Copy</Button>
                <Button variant="outlined" color="primary">Share</Button>
                <Button variant="contained" color="primary">Visit</Button>
            </Grid>
        </Grid>
    );
}

export default CreateSuccess;