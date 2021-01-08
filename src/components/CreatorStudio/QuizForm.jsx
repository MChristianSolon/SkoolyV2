import React, { useState, useReducer } from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Input, Radio, RadioGroup, Typography, InputLabel, Select, MenuItem, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../../Firebase/Firebase';

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline-block'
    },
    fRow: {
        flexDirection: 'row'
    },
    icon: {
        width: '20px'
    }
    
}));

const infoFields = {
    questions: [{
        question: '',
        type: 'multiple',
        choices: [],
        ans: null
    }],
}

const contentReducer = (state, { index, value, method, i }) => {
    let questions = [...state.questions];

    switch(method) {
        //questions property
        case 'add': questions.push({ question: '', type: 'multiple', choices: [{name: '', val: true}] });
                        break;
        case 'type': questions[index].type = value;
                        break;
        case 'question': questions[index].question = value;
                        break;
        case 'ans': questions[index].ans = value;
                        break;
        //choice array
        case 'modifyChoice':  questions[index].choices[i].name = value;
                        break;
        case 'modifyChecked': questions[index].choices[i].val = value;
                        break;
        case 'addChoice': questions[index].choices.push({name: '', val: true});
                        break;
        case 'delChoice': let find = questions[index].choices.indexOf(value);
                        questions[index].choices.splice(find, 1);
                        break;
        default: questions.splice(index, 1);
    }
        
    return { ...state, questions }
}

function QuizForm({ data, callback }) {
    const classes = useStyles();
    let [content, dispatchContent] = useReducer(contentReducer, !!data ? data : infoFields);
    let [name, setName] = useState(!!data ? data.name : '');

    //handles change of event for the entire quiz content
    const contentHandler = (e, index, method, i) => {
        const value = !!e.target ? e.target.value : e;
        dispatchContent({
            index,
            value,
            method,
            i,
        });
    }
 
    //conditional rendering on answer type
    const renderChoiceType = (info, index) => {
        if(info.type === 'multiple')
            return (
                <>
                    <FormLabel component="legend">Choices</FormLabel>
                    <RadioGroup aria-label="choices" value={info.ans} onChange={(e) => contentHandler(e, index, 'ans')} className={classes.fRow}>
                        {
                            info.choices.map((choice, i) => (
                                <div key={i} className={classes.fRow}>
                                    {/* <FormControlLabel value={choice.name} control={<Radio />}/> */}
                                    <Radio value={choice.name} className={classes.icon}/>
                                    <FormControl>
                                        <Input 
                                            value={choice.name} 
                                            className={classes.inline}
                                            onChange={(e) => contentHandler(e, index, 'modifyChoice', i)}
                                        />
                                    </FormControl>
                                    <Button color="secondary"
                                        className={`${classes.inline} ${classes.icon}`}
                                        onClick={() => contentHandler(choice.name, index, 'delChoice')}
                                    >X</Button>
                                </div>
                            ))
                        }
                    </RadioGroup>
                    <Button color="secondary" onClick={(e) => contentHandler(e, index, 'addChoice')}>Add choice</Button>
                </>
            );
        else if(info.type === 'multipleAns')
                return (
                    <>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Choices</FormLabel>
                        {
                            info.choices.map((choice, i) => (
                                <div key={i} style={{display: 'flex'}}>
                                    <FormControlLabel
                                        control={<Checkbox checked={choice.val} onChange={(e) => contentHandler(e.target.checked, index, 'modifyChecked', i)}/>}
                                        className={classes.icon}
                                    />
                                    <FormControl >
                                        <InputLabel>Choice</InputLabel>
                                        <Input 
                                            value={choice.name}
                                            className={classes.inline}
                                            onChange={(e) => contentHandler(e, index, 'modifyChoice', i)}
                                        />
                                    </FormControl>
                                    <Button 
                                        color="secondary" 
                                        className={`${classes.inline} ${classes.icon}`} 
                                        onClick={() => contentHandler(choice.name, index, 'delChoice')}
                                    >X</Button>
                                </div>
                            ))
                        }
                        
                    </FormControl>
                    <Button color="secondary" onClick={(e) => contentHandler(e, index, 'addChoice')}>Add choice</Button>
                    </>
                )
        else if(info.type === 'blank')
            return (
                <>
                {
                    //stop
                    info.choices.map((choice, i) => (
                        <FormControl key={i} className={classes.fRow}>
                            <InputLabel htmlFor={`answer-${i}`}>Answer</InputLabel>
                            <Input 
                                id={`answer-${i}`} 
                                value={choice.name} 
                                onChange={(e) => contentHandler(e, index, 'modifyChoice', i)}
                            />
                            <Button 
                                color="secondary"
                                className={`${classes.inline} ${classes.icon}`}
                                onClick={(e) => contentHandler(e, index, 'delChoice', i)}
                            >X</Button>
                        </FormControl>
                    ))
                }
                <Button color="secondary" onClick={(e) => contentHandler(e, index, 'addChoice')}>Add possible answers</Button>
            </>
            );
    }

    const formHandler = (e) => {
        e.preventDefault();
        let data = {...content}
        data.name = name;
        
        if(callback) {
            callback(data);
        }
        else {
            let quizAdd = {};
            
            quizAdd[`SubLessons.${data.lesson_name}.quizes`] = data;

            //upload to firebase
            // db.collection('courses').doc(courseId).update(quizAdd)
        } 
        console.log(e.target)
        e.target.reset();
    }

    React.useEffect(() => {
        console.log(content.questions);
    }, [content])

    return (
        <Grid container>
            <Grid item container xs={12} direction="column" alignItems="center" alignContent="stretch">
                <Grid item xs={8}>
                    <Typography variant="h5">Quiz</Typography>
                    <FormControl>
                        <InputLabel>Quiz name</InputLabel>
                        <Input value={name} onChange={(e) => setName(e.target.value)}/>
                    </FormControl>
                </Grid>
                <Grid item container justify="center" xs={8}>
                    <form onSubmit={formHandler}>
                    <Grid item container direction="row" xs={12}>
                    {
                        content.questions.map((info, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" align="left">Question {index + 1}</Typography>
                                    </Grid>
                                    <Grid item xs={9}>
                                        <FormControl component="fieldset" fullWidth>
                                            <InputLabel>Question</InputLabel>
                                            <Input 
                                                value={info.question}
                                                placeholder="Question"
                                                fullWidth 
                                                onChange={(e) => contentHandler(e, index, 'question')}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <FormControl>
                                            <InputLabel id={`type ${index}`}>Type</InputLabel>
                                            <Select
                                            labelId={`type ${index}`}
                                            value={info.type}
                                            onChange={(e) => contentHandler(e, index, 'type')}
                                            >
                                                <MenuItem value="multiple">Multiple choice</MenuItem>
                                                <MenuItem value="multipleAns">Multiple answers</MenuItem>
                                                <MenuItem value="open">Long answer</MenuItem>
                                                <MenuItem value="blank">Short answer</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        {
                                            !!info.type && renderChoiceType(info, index)
                                        }
                                    </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button onClick={(e) => contentHandler(e, index, 'delete')}>Delete Question</Button>
                                    </Grid>
                                    <Divider style={{width: '100%', margin: '20px 0'}}/>
                                </React.Fragment>
                            )
                        })
                    }
                    <Button onClick={(e) => contentHandler(e, 0, 'add')}>Add Question</Button>
                    <Button type="submit">{!!data ? 'Done' : 'Upload'}</Button>
                    </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default QuizForm;