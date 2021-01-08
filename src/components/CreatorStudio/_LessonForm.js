import React, { useState } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, AccordionActions, Button, Divider, FormControl, Grid, IconButton, Input, InputLabel, List, ListItem, ListItemText, TextField, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from './CreatorStudio';

function LessonForm({ index, data, handle, setScreen }) {
    const classes = useStyles();

    //input methods state
    let [isUrlUpload, setIsUrlUpload] = useState(false);

    //input error handler
    let [isLessonBlank, setIsLessonBlank] = useState(false);

        const handleLessonError = (event) => {
            event.target.value === '' ? setIsLessonBlank(true) : setIsLessonBlank(false)
        }
    
    /* QUIZ HANDLERS*/

    //add quiz data to creator studio
    const handleAddQuiz = (data, index) => {
        handle(data, index, 'quiz');
        setScreen({status: false, data: null, callback: null});
    }

    //return edited quiz
    const handleEditQuiz = (data, index) => {
        handle(data, index, 'modifyQuiz');
        setScreen({status: false, data: null, callback: null});
    }

    return (
        <>
            <Accordion defaultExpanded>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography>{data.lesson_name}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <form  id={`lesson-form-${index}`}>
                                    <Typography variant="h6" align="left">Lesson Information</Typography>
                                    <FormControl fullWidth className={classes.gutterBottom}>
                                        <InputLabel htmlFor={`lesson-title-${index}`}>Lesson Title</InputLabel>
                                        <Input 
                                            id={`lesson-title-${index}`} 
                                            name="lesson_name"
                                            value={data.lesson_name} 
                                            onChange={(event) => handle(event, index)}
                                            onBlur={handleLessonError}
                                            error={isLessonBlank}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth className={classes.gutterBottom}>
                                        <TextField 
                                            multiline 
                                            rows={4}
                                            value={data.description}
                                            onChange={(event) => handle(event, index)}
                                            label="Description" 
                                            name="description"
                                        />
                                    </FormControl>
                                </form>
                        </Grid>
                        <Grid item container xs={12} sm={6} direction="column" justify="center" alignItems="center">
                            {/* url */}
                            {!isUrlUpload 
                                ? (<IconButton>
                                        <AddCircleIcon className={classes.uploadIcon}/>
                                    </IconButton>)
                                : (
                                    <TextField 
                                        name="url"
                                        value={data.url}
                                        onChange={(event) => handle(event, index)}
                                        placeholder="URL" 
                                        className={classes.spaceTB}
                                    />
                                )
                            }
                            <Button 
                                size="small" 
                                onClick={() => setIsUrlUpload(false)}>
                                    Upload Video File
                            </Button>
                            <Button 
                                color="primary" 
                                size="small" 
                                onClick={() => setIsUrlUpload(true)}>
                                    Upload Url
                            </Button>
                        </Grid>
                        <Grid item container xs={12} sm={6} direction="column" alignItems="flex-start">
                            <Grid item>
                                <Typography variant="h6" align="left">Quizes</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <List>
                                    {
                                        data.quizes.map((q, i) => (
                                            <ListItem key={i}>
                                                <Button 
                                                    color="secondary" 
                                                    onClick={() => {setScreen({
                                                        status: true, 
                                                        data: q, 
                                                        callback: (data) => handleEditQuiz(data, index)
                                                    })}}
                                                >{q.name}</Button>
                                            </ListItem>
                                        ))
                                    }
                                </List>
                                <Button 
                                    variant="outlined" 
                                    color="secondary"
                                    onClick={() => setScreen({
                                        status: true, 
                                        data: null, 
                                        callback: (data) => handleAddQuiz(data, index)
                                    })}
                                >Add New Quiz</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </AccordionDetails>
                <Divider/>
                <AccordionActions className={classes.accordionDetails} >
                    <Button 
                        color="secondary"
                        onClick={(event) => handle(event, index, 'delete')}
                    >Delete</Button>
                </AccordionActions>
            </Accordion>
        </>
    );
}

export default LessonForm;