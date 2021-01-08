import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import SingleCourse from './SingleCourse'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton'


const courseStyle = { 
    transitionDuration: '0.3s',
    height: '40vh',
}

function Courses({myCourses}) {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        setCourses(() => {
            let newArr = []
            Object.keys(myCourses).forEach(item => {
                let progress = 0;
                Object.values(myCourses[item]).forEach(value => {
                    progress += value / Object.values(myCourses).length    
                })
                newArr.push(
                <Grid item xs={3} style={{height: '35vh', marginBottom: '2vh'}} key={item}>
                    <Card style={{height: '35vh'}}>
                        <CardContent>
                            <SingleCourse courseName={item} progress={progress} room={myCourses[item].room}/>                            
                        </CardContent>
                    </Card>
                </Grid>
                )
            })
            return newArr
        })
    },[myCourses])
    return (
        <Grid container className="UserCard" style={courseStyle}> 
            <Grid item xs={12}>
                <Grid container spacing={4}>
                     {courses}
                     <Grid item xs={3} style={{height: '35vh'}}>
                        <div style={{height: '35vh'}}>
                            <IconButton href="/">
                                <AddCircleIcon color="primary" style={{height: '15vh', width: '15vh', marginTop: '5vh'}}/>                
                            </IconButton>
                        </div>
                     </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Courses
