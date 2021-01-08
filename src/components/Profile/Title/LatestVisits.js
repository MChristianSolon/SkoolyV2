import React, {useState, useEffect} from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

function LatestVisits() {
    const [recentCourses, setRecentCourses] = useState([]) 

    useEffect(() => {
        setRecentCourses(() => {
            const newCoursesArr = []
            for(let i = 0; i < 3; i++){
                newCoursesArr.push(
                    <Grid item xs={4}>
                        <Card style={{height: '10vh', backgroundImage: `url('https://picsum.photos/100/200')`}}>
                        </Card>
                    </Grid>
                    )
        }       
        return newCoursesArr
            }
        )
    },[])
    return (
        <div style={{margin: '40px', marginTop: '20px', marginBottom: '20px'}}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                Recent Courses
            </Grid>
            <Grid item xs={12}>
             <Grid container spacing={1}>
                 {recentCourses}
             </Grid>
            </Grid>
        </Grid>
        </div>
    )
}

export default LatestVisits
