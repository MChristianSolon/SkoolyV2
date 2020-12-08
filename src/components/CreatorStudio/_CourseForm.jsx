import React, { useState } from 'react';
import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { useStyles } from './CreatorStudio';
import user from '../Contexts/hardTeacher';

function CourseForm({ isNewCourse, setIsNewCourse, courseId, setCourseId }) {
    const classes = useStyles();

    //input error handler
    let [isCourseBlank, setIsCourseBlank] = useState(false);

        const handleCourseError = (event) => {
            event.target.value === '' ? setIsCourseBlank(true) : setIsCourseBlank(false)
        }

    //select handler
    let [open, setOpen] = useState(false);

        const handleSelectChange = (event) => {
            setCourseId(event.target.value);
        };

    return (
        <>
            {/* title */}
            <Grid item container justify="space-between">
                <Grid item>
                    <Typography variant="h5" display="inline">Course</Typography>
                </Grid>
                <Grid item>
                    <Button 
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => setIsNewCourse(c => !c)}
                    >{!!isNewCourse ? 'Choose existing' : 'Add'}</Button>
                </Grid>
            </Grid>
            {/* input */}
            <FormControl fullWidth className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label" htmlFor="course-name">Course Name</InputLabel>
                {!isNewCourse
                    ?   (<Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            value={courseId}
                            onChange={handleSelectChange}
                            onBlur={handleCourseError}
                            error={isCourseBlank}
                        >
                            <MenuItem value="">
                                <em>Choose...</em>
                            </MenuItem>
                            {user.courses.map(course => 
                                (<MenuItem value={course.id} key={course.id}>{course.name}</MenuItem>)
                            )}
                        </Select>)
                    :   (<Input 
                            id="course-name"
                            name="course"
                            value={courseId} 
                            onBlur={handleCourseError} 
                            onChange={e => setCourseId(e.target.value)}
                            error={isCourseBlank}
                        />)
                }
            </FormControl>
        </>
    );
}

export default CourseForm;