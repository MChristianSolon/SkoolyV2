import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import {db} from '../../Firebase/Firebase'

function CreatorStudio() {
    const [validCreate, setValidCreate] = useState(false);
    const [newVideo, setNewVideo] = useState("")
    const [currentUser] = useState("Kurisochan")

    const createChange = (event) => {
        setNewVideo(event.target.value);
      }    
    const handleSubmit = (event) => {
        event.preventDefault()
        setValidCreate(true)

        // db.collection('courses').add({

        // })
    }


    return (
        <Grid container spacing={4}>
            <form onSubmit={handleSubmit}>  
            <Grid item xs={12}>
                <TextField
                error={validCreate}
                helperText={validCreate ? 'Invalid Url' : ''}
                className="code-text-field url-text-field"
                label="Enter Youtube Video Link"
                variant="filled"
                onChange={createChange}
                autoComplete="off"
                value={newVideo}
                />
              </Grid>
              <Grid item xs={12}>
                    <Button type="submit">Add a Video for {currentUser}</Button>
              </Grid>
                </form>
        </Grid>
    )
}

export default CreatorStudio
