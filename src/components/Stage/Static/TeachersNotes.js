import React from 'react'

function TeachersNotes({videoTranscript}) {
    console.log("BITCH" + videoTranscript)
    return (
        <div style={{whiteSpace: "pre-wrap", textAlign: "left"}}>
            <p>
            {videoTranscript}
            </p>
        </div>
    )
}

export default TeachersNotes
