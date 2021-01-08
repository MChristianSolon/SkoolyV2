import React, { useEffect, useState } from 'react'
import SingleExpandedReply from './SingleExpandedReply'

function DiscussionBody({responses}) {
    const [replies, setReplies] = useState([])
    useEffect(() => {
        if(responses){
            let newArr = [] 
            Object.keys(responses).forEach((key) => {
             newArr.push(<SingleExpandedReply key={key} response={responses[key]}/>)
         });
             setReplies(newArr)
        }
    },[responses])
    return (
        <div style={{overflowY: 'scroll', height: '100%'}}>
            {replies}
        </div>
    )
}

export default DiscussionBody
