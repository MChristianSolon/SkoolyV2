import React, { useState, useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, CircularProgress, Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreateSuccess from './_CreateSuccess';
import LessonForm from './_LessonForm';
import CourseForm from './_CourseForm';
import QuizForm from './QuizForm';
import user from '../Contexts/hardTeacher';
import { db } from '../../Firebase/Firebase';
import { Redirect } from 'react-router-dom';

//styles
export const useStyles = makeStyles(theme => ({
    uploadIcon: {
        height: '50px',
        width: '50px',
    },
    spaceTB: {
        margin: '20px 0',
    },
    gutterBottom: {
        marginBottom: theme.spacing(2)
    },
    divider: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    accordionDetails: {
        backgroundColor: '#eee',
    }
}));

const infoFields = {
    lessons: [{
        lesson_name: 'New',
        description: '',
        url: '',
        quizes: []
    }],
}

const formReducer = (state, { index, field, value, method }) => {
    let updatedLessons = [...state.lessons];

    if(method === 'modify')
        updatedLessons[index][field] = value; 
    else if(method === 'add')
        updatedLessons.push({ lesson: '', description: '', url: '' });
    else if(method === 'delete')
        updatedLessons.splice(index, 1);
    else if(method === 'modifyQuiz') {
        const i = updatedLessons[index].quizes.findIndex(quiz => quiz.name === value.name);
        updatedLessons[index].quizes[i] = value;
    }
    else
        updatedLessons[index].quizes.push(value);
        
    return { ...state, lessons: updatedLessons}
}

function CreatorStudio() {
    const classes = useStyles();

    //input methods state
    let [isNewCourse, setIsNewCourse] = useState(false);
    let [courseId, setCourseId] = useState('');
    let [success, setSuccess] = useState(false);
    let [quizScreen, setQuizScreen] = useState({
        status: false,
        data: {},
        callback: null
    });

    //form handler
    let [formStates, dispatchForm] = useReducer(formReducer, infoFields);

        const handleForm = (event, index, method) => {
            const value = event.target ? event.target.value : event;
            const field = event.target ? event.target.name : null;
            dispatchForm({
                index: index,
                field: field,
                value: value,
                method: method || 'modify',
            });
        }

        const fetchPrevData = () => {
            //error handling
            if(courseId === '') {
                alert('Please select course'); return;
            }
            //countinue
            db.collection('courses').doc(courseId).get()
            .then(res => res.data())
            .then(res => {
                formStates.course = res.course_name;
                for(let lesson in res.SubLessons) {
                    handleForm(null, 0, 'add');
                    ['lesson_name', 'url', 'description'].forEach((field) => {
                        handleForm({target: {name: field, value: res.SubLessons[lesson][field]}}, formStates.lessons.length);
                    });
                }
            });
        }

    //submit handler 
    let [isUploading, setIsUploading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        //error handling
        if(courseId === '') {            
            alert('Please select course'); return;
        }
        
        //continue
        if(isNewCourse) {
            const newCourse = {
                course_name: courseId,
                SubLessons: {}
            }

            //merge all information
            formStates.lessons.forEach((form) => {
                //error handling
                if(form.lesson_name === '') {
                    alert('Dont leave any lesson name blank'); return;
                }
                
                //continue
                newCourse.SubLessons[form.lesson_name] = {
                    lesson_name: form.lesson_name,
                    author: user.name,
                    description: form.description,
                    video_url: form.url,
                    quizes: form.quizes
                };
            });

            let room = uuidv4().substring(0,18);

            //push to firebase
            setIsUploading(true);
            db.collection('courses').doc(room).set(newCourse)
            .then(() => setIsUploading(false))
            .then(() => setSuccess(true));
            /* TODO update user info */
        } else {
            let subLessonsUpdate = {};

            //merge all information
            formStates.lessons.forEach((form) => {
                //add [lesson] to firebase
                subLessonsUpdate[`SubLessons.${form.lesson_name}`] = {
                   lesson_name: form.lesson_name,
                   description: form.description,
                   url: form.url,
                   quizes: form.quizes
                }
            });

            //push to firebase
            setIsUploading(true);
            db.collection('courses').doc(courseId).update(subLessonsUpdate)
            .then(() => setIsUploading(false))
            .then(() => setSuccess(true));
        }
    };

    useEffect(() => {
        console.log(formStates)
    }, [formStates])

    if(success)
        return (<CreateSuccess username={user.name} courseId={courseId}/>)
    else if (quizScreen.status)
        return <QuizForm data={quizScreen.data} callback={quizScreen.callback}/>
    return (
        <Grid container justify="center">
            <Grid item container xs={12} md={8}>
                {/* title */}
                <Grid item xs={12}>
                    <Typography variant="h3" align="center" className={classes.spaceTB}>Creator Studio</Typography>
                    <Divider className={classes.divider}/>
                </Grid>
                {/* content */}
                <Grid item container alignItems="stretch" direction="column">
                    {/* course */}
                    <Grid item>
                        <CourseForm isNewCourse={isNewCourse} setIsNewCourse={setIsNewCourse} courseId={courseId} setCourseId={setCourseId} data={formStates.course}/>
                    </Grid>
                    <Divider className={classes.divider}/>
                    {/* lessons */}
                    <Grid item>
                        <Grid item container justify="space-between" className={classes.gutterBottom}>
                            <Grid item>
                                <Typography variant="h6" display="inline">Lessons</Typography>
                            </Grid>
                            <Grid item>
                                {!isNewCourse ? 
                                    <Button 
                                        color="primary"
                                        size="small"
                                        onClick={fetchPrevData}
                                    >Load existing lessons</Button> : null}
                                <Button 
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                    onClick={(event) => handleForm(event, 0, 'add')}
                                >Add</Button>
                            </Grid>
                        </Grid>
                        {formStates.lessons.map((info, index) => (
                            <LessonForm key={index} index={index} data={info} handle={handleForm} setScreen={setQuizScreen}/>
                        ))}
                    </Grid>
                    <Grid item>
                        {!isUploading
                        ? <Button 
                            fullWidth 
                            variant="contained" 
                            color="primary" 
                            className={classes.spaceTB}
                            onClick={handleSubmit}
                        >Upload</Button>
                        : <Button 
                            fullWidth 
                            variant="contained" 
                            color="primary" 
                            className={classes.spaceTB}
                            onClick={handleSubmit}
                            disabled={isUploading ? true : false}
                        ><CircularProgress/></Button>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
    // : (<CreateSuccess url={`skooly.com/courses?host=${user.name}&course=${courseId}`}/>);
}

export default CreatorStudio;